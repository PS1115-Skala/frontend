import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-dialog-delete-asignation',
  template: `
    <h1 mat-dialog-title>{{ title }}</h1>
    <div mat-dialog-content>
      <p>{{ message }}</p>
    </div>
    <div mat-dialog-actions align="center">
      <button mat-button (click)="onClick('pepe10000')">Cancelar</button>
      <button mat-button (click)="onClick('Si')">Aceptar</button>
    </div>
  `,
})
export class DialogDeleteAsignationComponent {
  public title: string;
  public message: string;
  public field: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogDeleteAsignationComponent>
  ) {
    this.dialogRef.disableClose = true;
    this.title = data.title;
    this.message = data.message;
    this.field = 'Si';
  }

  onClick(respuesta: string) {
    this.dialogRef.close(respuesta == 'Si' ? this.field : respuesta);
  }
}
