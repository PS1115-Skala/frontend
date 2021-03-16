import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-reservas-especiales',
  templateUrl: './form-reservas-especiales.component.html',
  styleUrls: ['./form-reservas-especiales.component.scss']
})
export class FormReservasEspecialesComponent implements OnInit {
  public form: FormGroup;
  public hours: any[];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({ 
      contact_name: [null, [Validators.required]], 
      contact_email: [null, [Validators.required]],
      reservation_day: [null, [Validators.required]],
      reservation_hour: [null, [Validators.required]],
      amount_people: [null, [Validators.required]],
      observations: [null, [Validators.required]] 
    });
  }

  onFormChange(event?: any) {

  }

  create() {

  }

}
