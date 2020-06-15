import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogSemanasEspecificasComponent } from 'app/dialogs/dialog-semanas-especificas.component';
import { AppService } from 'app/app.service';
import { DialogDeleteAsignationComponent } from 'app/dialogs/dialog-delete-asignation.component';
import { USER_TYPE } from 'app/interfaces/user';

@Component({
  selector: 'app-del-reserva',
  templateUrl: './del-reserva.component.html',
  styleUrls: ['./del-reserva.component.scss']
})

export class DelReservaComponent implements OnInit {
  public roomId: string;
  public semanas: string;
  public materia: string;
  public cantidad: number;
  public materiasOptions: any[];
  public isTableReady: boolean = false;
  public displayedColumns: string[] = ['hora', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  public dataSource: any[];
  public semanaEspecifica: number;
  
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private appService: AppService,
    private chgDetRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.roomId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.obtenerMaterias();
  }

  obtenerMaterias() {
    this.appService.getSubjects()
    .subscribe( response => {
      this.materiasOptions = response;
    })
  }

  onResetEspecifica() {
    // on select no detecta el caso en que se vuelve a seleccionar especifica
    if (this.semanas == 'especifica') {
      this.semanas = undefined;
      this.isTableReady = false;
      this.onSelectSemanas();
    }
  }

  onSelectSemanas() {
    let data;
    this.semanaEspecifica = undefined; // limpia semana especifica
    if (this.semanas == 'especifica') {
      // dialog semanas especificas
      const dialogRef = this.dialog.open(DialogSemanasEspecificasComponent, {
        width: '300px',
        data: { data: data }
      })
      dialogRef.afterClosed().subscribe( result => {
        if (result == undefined) {
          this.semanas = undefined;
          this.isTableReady = false;
          this.dataSource = undefined;
        } else {
          this.semanaEspecifica = result;
          this.chgDetRef.detectChanges(); // previene error de cambios no detectados
          this.appService.getReservations(this.roomId, this.semanaEspecifica.toString())
          .finally( () => {
            this.dataSource = this.generarTabla(data);
            this.isTableReady = true;  // show tabla
          })
          .subscribe( response => {
            data = response;
          })
        }
      })
    }
    else {
      if (this.semanas == undefined) {}
      else {
        // get tabla
        this.appService.getReservations(this.roomId, this.semanas)
        .finally( () => {
          this.dataSource = this.generarTabla(data);
          this.isTableReady = true;  // show tabla
        })
        .subscribe( response => {
          data = response;
        })
      }
    }
  }

  generarTabla(data: any[]): any[] {
    let table = [];
    for (let index = 0; index < 11; index++) {
      table[index] =  { hora: index + 1 }
    }
    if ( data.length == 0 ) {
      data = table; // empty
    }
    else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].day === "lunes" || data[i].day === "Lunes"){
          table[data[i].hour - 1].lunes = data[i].subject_id;
        }
        else if(data[i].day === "martes" || data[i].day === "Martes"){
          table[data[i].hour - 1].martes = data[i].subject_id;
        }
        else if(data[i].day === "miercoles" || data[i].day === "Miercoles"){
          table[data[i].hour - 1].miercoles = data[i].subject_id;
        }
        else if(data[i].day === "jueves" || data[i].day === "Jueves"){
          table[data[i].hour - 1].jueves = data[i].subject_id;
        }
        else if(data[i].day === "viernes" || data[i].day === "Viernes") {
          table[data[i].hour - 1].viernes = data[i].subject_id;
        }
      }
    }
    return table
  }

  puedeReservar(): boolean {
    if (this.semanas != undefined) {
      const index = this.dataSource.findIndex(d => (
        d.lunesCheck == true || d.martesCheck == true || 
        d.miercolesCheck == true || d.juevesCheck == true || 
        d.viernesCheck == true)
      );
      if (index != -1) { return true; }
      else { return false; }
    }
    else { return false; }
  }

  reservar() {
    const requester = localStorage.getItem('userId');
    let isAdmin: boolean = false;
    this.appService.isUserType(USER_TYPE.LAB_ADMIN).then(response => { isAdmin = response; })
    const horario = [];
    // mapear horario
    this.dataSource.forEach( (h) => {
      // console.log(h);
      for (var index in h) {
        if ( index == 'lunesCheck' && h.lunesCheck) { let obj = { subject: h.lunes,
           dia: 'lunes', hora: h.hora }; horario.push(obj) }
        else if ( index == 'martesCheck' && h.martesCheck) { let obj = { subject: h.martes,
           dia: 'martes', hora: h.hora }; horario.push(obj) }
        else if ( index == 'miercolesCheck' && h.miercolesCheck) { let obj = { subject: h.miercoles,
           dia: 'miercoles', hora: h.hora }; horario.push(obj) }
        else if ( index == 'juevesCheck' && h.juevesCheck) { let obj = { subject: h.jueves,
           dia: 'jueves', hora: h.hora }; horario.push(obj) }
        else if ( index == 'viernesCheck' && h.viernesCheck) { let obj = { subject: h.viernes,
           dia: 'viernes', hora: h.hora }; horario.push(obj) }
        else { } // otros horarios
      }
    })
    console.log(horario)
    const dialogFieldRef = this.dialog.open(DialogDeleteAsignationComponent, {
      data: { title: 'Elminar Reserva', message: 'Desea continuar? '}
    });
    dialogFieldRef.afterClosed().subscribe( result => {
      // es pepe 10000 porque si en el caption del dialogo se escribe No, no se hace la reserva
      if (result != 'pepe10000') {
      // crear reserva
        this.appService.createRequestToDelete(
          this.roomId,
          this.semanas == 'especifica' ? this.semanaEspecifica.toString() : this.semanas,
          horario,
          isAdmin
          )
        .subscribe( response => {
          console.log(response);
          this.showSnackBar(response.message);
          this.router.navigate(['dashboard']);
        })
      }
    })
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, null, { duration: 4000 });
  }

}
