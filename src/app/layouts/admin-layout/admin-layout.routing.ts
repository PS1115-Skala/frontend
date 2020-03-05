import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { InfoSalaComponent } from 'app/info-sala/info-sala.component';
import { RequestComponent } from '../../request/request.component'
import { LaboratoriosComponent } from 'app/laboratorios/laboratorios.component';
import { HorarioComponent } from 'app/horario/horario.component';
import { SalasUserComponent } from 'app/laboratorios/salas-user/salas-user.component';
import { ReservaComponent } from 'app/reserva/reserva.component';

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
    { path: 'reserva/:id', component: ReservaComponent}
];
