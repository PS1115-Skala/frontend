import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isEnglish: boolean;
  public title: string;
  public paragraph: string;
  public checkText: string;
  public titulo: string;
  public parrafo: string;
  public textoCheck: string;
  public links: any[]; // url - text
  public direccionSartenejas: string;
  public direccionCamuri: string;
  public contacto: string;
  public rights: string;
  public rightLink: string;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit() {
    localStorage.clear(); // DELETE THIS AFTER IMPLEMENTING A CORRECT LOGOUT
    this.isEnglish = false;
    this.title = "Enter your USBID and Password";
    this.paragraph = "For security reasons, please Log Out and Exit your \n web browser when you are done accessing services \n that require authentication!"
    this.checkText = "Warn me before logging me into other sites.";
    this.titulo = "Introduzca su USBID y Contraseña.";
    this.parrafo = "Por razones de seguridad, por favor cierre la sesión \n y cierre su navegador web cuando haya terminado \n de acceder a los servicios que requieren \n autenticación."
    this.textoCheck = "Avisarme antes de abrir sesión en otros sitios.";
    this.links = [
      { url: 'http://www.usb.ve/home/node/68', text: 'e-virtual' },
      { url: 'https://webmail.usb.ve/', text: 'correo' }, 
      { url: 'https://esopo.usb.ve/', text: 'esopo' }, 
      { url: 'https://www.youtube.com/user/canalusb', text: 'canalUSB' }, 
      { url: 'http://www.usb.ve/agenda.php', text: 'Agenda Cultural' },  
      { url: 'http://usbnoticias.info/', text: 'USBnoticias' }, 
      { url: 'http://www.usb.ve/home/node/55', text: 'Calendario' }, 
    ];
    this.direccionSartenejas = "Sede Sartenejas, Baruta, Edo. Miranda - Apartado 89000 - Cable Unibolivar - Caracas Venezuela. Teléfono +58 0212-9063111"
    this.direccionCamuri = "Sede Litoral, Camurí Grande, Edo. Vargas Parroquia Naiguatá. Teléfono +58 0212-9069000";
    this.contacto = "Diseñada y adaptada por la Dirección de Servicios Telemáticos webmaster@usb.ve";
    this.rights = "Copyright © 2005-2007 JA-SIG. All rights reserved." 
    this.rightLink = "JA-SIG Central Authentication Service 3.3.5"

    this.form = this.formBuilder.group({
      usbId: [null, [Validators.required]],
      clave: [null, [Validators.required]],
      check: false
    })
  }

  async onSubmit(values) {
    // console.log(values);
    if (this.form.valid) {
      await this.appService.login(values.usbId).then(users => {
        const user = users[0];
      });
      await this.appService.loginPost(values.usbId, values.clave).then(users => {
        const user = users[0];
      });
      this.router.navigate(['dashboard']);

    }
  }

}
