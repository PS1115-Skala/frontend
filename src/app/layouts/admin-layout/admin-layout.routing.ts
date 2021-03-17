import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { InfoSalaComponent } from 'app/info-sala/info-sala.component';
import { RequestComponent } from '../../request/request.component'
import { LaboratoriosComponent } from 'app/laboratorios/laboratorios.component';
import { HorarioComponent } from 'app/horario/horario.component';
import { SalasUserComponent } from 'app/laboratorios/salas-user/salas-user.component';
import { ReservaComponent } from 'app/reserva/reserva.component';
import { DelReservaComponent } from 'app/del-reserva/del-reserva.component';
import { LabfAdminComponent } from 'app/labf-admin/labf-admin.component';
import { NewRoomsComponent } from 'app/new-rooms/new-rooms.component';
import { UsuariosComponent } from 'app/usuarios/usuarios.component';
import { DetalleUsuarioComponent } from 'app/usuarios/detalle-usuario/detalle-usuario.component';
import { UsuariosGuardService } from './usuarios-guard.service';
import { ReservasEspecialesComponent } from 'app/reservas-especiales/reservas-especiales.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'info-sala/:rid',      component: InfoSalaComponent },
    { path: 'solicitudes',      component: RequestComponent },
    { path: 'laboratorios',
      children: [
        { path:'salas/:id', component: SalasUserComponent},
        { path: '', component: LaboratoriosComponent}
    ]},
    { path: 'horario',      component: HorarioComponent},
    { path: 'reserva/:id', component: ReservaComponent},
    { path: 'del-reserva/:id', component: DelReservaComponent},
    { path: 'horario/:rid',      component: HorarioComponent},
    { path: 'labf-admin', component: LabfAdminComponent },
    { path: 'new-rooms', component: NewRoomsComponent },
    { path: 'usuarios',
      children: [
        { path:':id', component: DetalleUsuarioComponent, canActivate: [UsuariosGuardService]},
        { path: '', component: UsuariosComponent, canActivate: [UsuariosGuardService]}
    ]},
    { path: 'reservas-especiales', component: ReservasEspecialesComponent },
];
