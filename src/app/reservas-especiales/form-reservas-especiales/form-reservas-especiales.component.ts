import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-form-reservas-especiales',
  templateUrl: './form-reservas-especiales.component.html',
  styleUrls: ['./form-reservas-especiales.component.scss']
})
export class FormReservasEspecialesComponent implements OnInit {
  public form: FormGroup;
  public hours: any[];
  public minDate: Date;
  public maxDate: Date;
  @Input() laboratorios: any[];
  @Output() formValues = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private service: AppService) { }

  ngOnInit() {
    this.createForm();
    this.hours = [
      {id: '7:00AM'},{id: '8:00AM'},{id: '9:00AM'},{id: '10:00AM'},
      {id: '11:00AM'},{id: '12:00AM'},{id: '1:00PM'},{id: '2:00PM'},
      {id: '3:00PM'},{id: '4:00PM'},{id: '5:00PM'},{id: '6:00PM'},
    ];
    this.getEndTrimestre();
  }

  createForm() {
    this.minDate = new Date();
    this.form = this.formBuilder.group({ 
      contact_name: [null, [Validators.required]], 
      contact_email: [null, [Validators.required, Validators.email, Validators.pattern('([a-z,0-9,-]+@usb\.ve)')]],
      laboratory: [null, [Validators.required]],
      reservation_day: [null, [Validators.required]],
      reservation_hour: [null, [Validators.required]],
      amount_people: [null, [Validators.required, Validators.pattern('([0-9]+)')]],
      observations: [null] 
    });
  }

  getEndTrimestre() {
    this.service.getTrimester().subscribe(response => this.maxDate = response[0].finish )
  }

  onFormChange(event?: any) {

  }

  create() {
    this.formValues.emit(this.form.value);
  }

}
