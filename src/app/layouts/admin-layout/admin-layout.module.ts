import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { InfoSalaComponent } from 'app/info-sala/info-sala.component';
import { RequestComponent } from '../../request/request.component';
import { LabfAdminComponent } from 'app/labf-admin/labf-admin.component';
import { NewRoomsComponent } from 'app/new-rooms/new-rooms.component';
import { MatTableModule } from '@angular/material/table';
import { UserTypePipe } from 'app/pipes/user-type.pipe';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDialogModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatIconModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';
import { LaboratoriosComponent } from 'app/laboratorios/laboratorios.component';
import { HorarioComponent } from 'app/horario/horario.component';
import { SalasUserComponent } from 'app/laboratorios/salas-user/salas-user.component';
import { ConfirmRejectionComponent } from 'app/popups/dialogs/confirm-rejection/confirm-rejection.component';
import { ConfirmRejectionMessageComponent } from 'app/popups/dialogs/confirm-rejection-message/confirm-rejection-message.component';
import { ReservaComponent } from 'app/reserva/reserva.component';
import { DialogSemanasEspecificasComponent } from 'app/dialogs/dialog-semanas-especificas.component';
import { DialogTextFieldComponent } from 'app/dialogs/dialog-textfield.component';
import { RequestStatusPipe } from 'app/pipes/request-status/request-status.pipe';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  declarations: [
    DashboardComponent,
    InfoSalaComponent,
    RequestComponent,
    UserTypePipe,
    LaboratoriosComponent,
    HorarioComponent,
    SalasUserComponent,
    ReservaComponent,
    DialogSemanasEspecificasComponent,
    DialogTextFieldComponent,
    LabfAdminComponent,
    NewRoomsComponent,
    ConfirmRejectionComponent,
    ConfirmRejectionMessageComponent,
    RequestStatusPipe,
  ],
  entryComponents: [
    DialogSemanasEspecificasComponent,
    DialogTextFieldComponent,
    LabfAdminComponent,
    ConfirmRejectionMessageComponent,
  ],
  providers: [
    MatDatepickerModule,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],

})

export class AdminLayoutModule {}
