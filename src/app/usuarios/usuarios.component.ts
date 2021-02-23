import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from 'app/app.service';

/** Componente de Usuarios */
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  public form: FormGroup;
  public tiposUsuarios: any[];
  public isTableReady: boolean;
  public displayedColumns: string[];
  public dataSource: any[]

  constructor(
    private service: AppService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isTableReady = false;
    this.displayedColumns = ['id', 'name', 'email', 'type', 'is_active', 'modificar'];
    this.form = this.formBuilder.group({ tipoUsuario: [null], });
    this.tiposUsuarios = [{id: 'profesor', name: 'Profesor'}, {id: 'admin', name: 'Admin'}];
    this.cargarUsuarios();
  }

  cargarUsuarios(tipoUsuario?: string) {
    this.service.getUsers(tipoUsuario)
    .finally( () => {
      this.isTableReady = true;
    })
    .subscribe( response => {
      this.dataSource = response;
    });
  }

  onFormChange() {
    this.cargarUsuarios(this.form.value.tipoUsuario);
  }

  crearModificarUsuario(idUsuario?: string) {
    this.router.navigate(['/usuarios/', idUsuario ? idUsuario : 'crear']);
  }

  deleteUser(idUsuario: string) {
    
  }

  puedeCrear() {
    return true;
  }

}
