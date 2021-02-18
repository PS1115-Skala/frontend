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

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: AppService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => { this.id = params['id'] == 'crear' ? undefined : params['id']; });
    this.form = this.formBuilder.group({ 
      id: [null],
      name: [null],
      email: [null],
      type: [null], 
      activo: [null]
    });
    if (this.id) { this.cargarUsuario(); }
  }

  cargarUsuario() {
    this.service.getUser(this.id).subscribe( response => { 
      const campos = ['id', 'name', 'email', 'type'];
      campos.forEach( campo => { this.form.controls[campo].setValue(response[0][campo]); });
      this.form.controls['activo'].setValue(response[0].is_active);
    });
  }

}
