import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from 'app/app.service';

/** Componente Detalle de Usuario para modificar y crear usuario */
@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss']
})
export class DetalleUsuarioComponent implements OnInit {
  /** Id del usuario undefined cuando se esta creando */
  public id: string;
  public form: FormGroup;
  public tiposUsuarios: any[];
  public estatus: any[];
  public options: any[];
  public camposModificados: string[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private service: AppService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => { this.id = params['id'] == 'crear' ? undefined : params['id']; });
    this.definirFormulario();
    this.cargaTiposUsuarios();
    this.cargaEstatus();
    this.cargarOptions();
    if (this.id) { this.cargarUsuario(); }
  }

  definirFormulario() {
    this.form = this.formBuilder.group({ 
      id: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email, Validators.pattern('([a-z,0-9,-]+@usb\.ve)')]],
      type: [null, [Validators.required]], 
      verificado: [null],
      activo: [null],
      chief: [null]
    });
  }

  /** Cargar estatus de momento estaticos */
  cargaEstatus() { this.estatus = [ {id: 1, name: 'Activo'}, {id: 0, name: 'Inactivo'}, ]; }

  /** Cargar Tipo Usuario de momento estatico */
  cargaTiposUsuarios() {
    this.tiposUsuarios = [
      {id: 0, name: 'Departamento'},
      {id: 1111, name: 'Estudiante'},
      {id: 2222, name: 'Profesor'},
      {id: 3333, name: 'Admin Lab'},
      {id: 4444, name: 'Lab F'},
    ];
  }

  cargarOptions() {
    this.options = [ {id: true, name: 'Si'}, {id: false, name: 'No'} ];
  }

  /** Cargar Informacion de usuario */
  cargarUsuario() {
    this.camposModificados = ['id'];
    this.service.getUser(this.id).subscribe( response => { 
      const campos = ['id', 'name', 'email', 'type', 'chief'];
      campos.forEach( campo => { this.form.controls[campo].setValue(response[0][campo]); });
      this.form.controls['verificado'].setValue(response[0].is_verified);
      this.form.controls['activo'].setValue(response[0].is_active);
      this.form.controls['id'].disable();
      this.form.controls['email'].disable();
    });
  }

  onFormChange(campo: string) {
    if (this.id != undefined) { this.camposModificados.push(campo); }
  }

  guardar(values) {
    console.log(values);
    if (this.id == undefined) { // crear
      this.service.createUser(values.id, values.name, values.email, values.type)
      .finally( () => { this.router.navigate(['/usuarios/']); })
      .subscribe( response => {
        console.log(response);
        this.showSnackBar(response.message);
      });
    }
    else { // actualizar
      let updValues = {...values};
      const filtrados = Object.entries(updValues);
      filtrados.forEach( v => { 
        if (this.camposModificados.includes(v[0]) == false) {
          updValues[v[0]] = null;
        }
      })
      this.service.updateUser(this.id, updValues.name, updValues.email, updValues.type, updValues.verificado, updValues.activo, updValues.chief).subscribe( response => {
        console.log(response);
        this.showSnackBar(response.message);
      });
    }
  }

  regresar() { this.location.back(); }

  /** Mensajito que sale cuando abajo en los botones de si y no */
  showSnackBar(message: string) {
    this._snackBar.open(message, null, { duration: 4000 });
  }

}
