import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-reservas-especiales',
  templateUrl: './reservas-especiales.component.html',
  styleUrls: ['./reservas-especiales.component.scss']
})
export class ReservasEspecialesComponent implements OnInit {
  public esMortal: boolean;
  public reservasEspeciales: any[];
  public form: FormGroup;
  public laboratorios: any[];
  public trimestres: any[];
  public showForm: boolean

  constructor(
    private service: AppService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.esMortal = false;
    this.showForm = false;
    if (!this.esMortal) {
      this.defineFilterForm();
      this.loadOptions();
      this.loadReservasEspeciales();
    };
  }

  defineFilterForm() {
    this.form = this.formBuilder.group({ laboratorio: [null], trimestre: [null], });
    this.loadOptions();
  }
  
  loadOptions() {
    // laboratorios
    // trimestres
  }
  
  loadReservasEspeciales() {
    this.service.getSpecialReservations().subscribe( response => this.reservasEspeciales = response );
  }

  onFormChange(event: any) {
    // filtrar tabla
  }

  onCreateReserv() {
    // abrir dialogo app-form-reservas-especiales
    this.showForm = true;
  }

}
