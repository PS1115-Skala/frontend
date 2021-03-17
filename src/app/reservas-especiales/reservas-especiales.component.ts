import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AppService } from 'app/app.service';
import { DialogDeleteAsignationComponent } from 'app/dialogs/dialog-delete-asignation.component';
import { DialogFormReservasEspecialesComponent } from 'app/dialogs/dialog-form-reservas-especiales.component';
import { USER_TYPE } from 'app/interfaces/user';

@Component({
  selector: 'app-reservas-especiales',
  templateUrl: './reservas-especiales.component.html',
  styleUrls: ['./reservas-especiales.component.scss']
})
export class ReservasEspecialesComponent implements OnInit {
  public isAdmin: boolean;
  public isLabF: boolean;
  public reservasEspeciales: any[];
  public form: FormGroup;
  public laboratorios: any[];
  public trimestres: any[];
  public displayedColumns: string[] = ['contact_name', 'requester_id', 'laboratory', 'reservation_day', 'delete'];
  public dataSource: any[];

  constructor(
    private service: AppService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.service.isUserType(USER_TYPE.LAB_ADMIN).then(result => {
      this.isAdmin = result
      if (!this.isAdmin) {
        this.service.isUserType(USER_TYPE.LAB_F).then(result => {
          this.isLabF = result
          if (this.isLabF) { this.iniciarPantallaAdmin(); }
        });
      }
      else { this.iniciarPantallaAdmin(); }
    });
    this.service.getAdminLabs().subscribe( response => this.laboratorios = response );
  }

  /** para admin o labf */
  iniciarPantallaAdmin() {
    this.defineFilterForm();
    this.loadTrimestres();
    this.loadReservasEspeciales(this.isAdmin ? localStorage.getItem('userId') : null);
  }

  defineFilterForm() {
    const laboratorio = this.isLabF ? 'todos' : localStorage.getItem('userId');
    this.form = this.formBuilder.group({ laboratorio: [laboratorio], trimestre: ['todos'], });
  }
  
  loadTrimestres() {
    this.service.getTrimesters().subscribe( response => this.trimestres = response );
  }
  
  loadReservasEspeciales(laboratorio?: string, trimestre?: string) {
    this.service.getSpecialReservations(laboratorio, trimestre).subscribe( response => this.dataSource = response );
  }

  /** Filtra reservas especiales de tabla */
  onFormChange(event: any) {
    const laboratorio = this.form.value.laboratorio == 'todos' ? null : this.form.value.laboratorio;
    const trimestre = this.form.value.trimestre == 'todos' ? null : this.form.value.trimestre;
    this.loadReservasEspeciales(laboratorio, trimestre);
  }

  /** Abrir dialogo de form reservas especiales */
  onCreateReserv() {
    let dialogRef = this.dialog.open(DialogFormReservasEspecialesComponent, { 
      width: '575px',
      data: {title: 'Crear Reserva Especial', laboratorios: this.laboratorios}
    });

    dialogRef.afterClosed().subscribe( result => { if (result != -1) { this.nuevaReserva(result); } });
  }

  deleteReserva(idReserva: any) {
    let confirmationRef = this.dialog.open(DialogDeleteAsignationComponent, {
      data: {title: 'Atención', message: 'Esta seguro que desea eliminar la reserva ' + idReserva}
    });

    confirmationRef.afterClosed().subscribe( result => {
      if (result == 'Si') {
        this.service.deleteSpecialReservation(idReserva).subscribe(response => {
          this.showSnackBar(response.message);
          this.onFormChange({});
        });
      }
    })
  }

  nuevaReserva(values: any) {
    this.service.createSpecialReservation(values, localStorage.getItem('userId'))
    .subscribe( response => {
      this.showSnackBar(response.message);
      if (this.isAdmin || this.isLabF) { this.onFormChange({}); }
    });
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, null, { duration: 4000 });
  }

}
