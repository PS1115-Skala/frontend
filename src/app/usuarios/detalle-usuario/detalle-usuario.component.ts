import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  public estatus: any[]

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private service: AppService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => { this.id = params['id'] == 'crear' ? undefined : params['id']; });
    this.definirFormulario();
    this.cargaTiposUsuarios();
    this.cargaEstatus();
    if (this.id) { this.cargarUsuario(); }
  }

  definirFormulario() {
    this.form = this.formBuilder.group({ 
      id: [null],
      name: [null],
      email: [null],
      type: [null], 
      activo: [null]
    });
  }

  /** Cargar estatus de momento estaticos */
  cargaEstatus() { this.estatus = [ {id: true, name: 'Activo'}, {id: false, name: 'Inactivo'}, ]; }

  /** Cargar Tipo Usuario de momento estatico */
  cargaTiposUsuarios() {
    this.tiposUsuarios = [
      {id: 1111, name: '1111'},
      {id: 2222, name: '2222'},
      {id: 3333, name: '3333'},
      {id: 4444, name: '4444'},
    ];
  }

  /** Cargar Informacion de usuario */
  cargarUsuario() {
    this.service.getUser(this.id).subscribe( response => { 
      const campos = ['id', 'name', 'email', 'type'];
      campos.forEach( campo => { this.form.controls[campo].setValue(response[0][campo]); });
      this.form.controls['activo'].setValue(response[0].is_active);
    });
  }

  onFormChange() {

  }

  guardar(values) {

  }

  regresar() { this.location.back(); }

}
