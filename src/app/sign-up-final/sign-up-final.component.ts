import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';


@Component({
  selector: 'app-sign-up-final',
  templateUrl: './sign-up-final.component.html',
  styleUrls: ['./sign-up-final.component.scss']
})
export class SignUpFinalComponent implements OnInit {
    public isEnglish: boolean;
    public links: any[]; // url - text
    public direccionSartenejas: string;
    public direccionCamuri: string;
    public contacto: string;
    public rights: string;
    public rightLink: string;
    public form: FormGroup;
    public nombre: string;
    public correo: string;
    public tipo: string;
  
    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private appService: AppService,
      private route: ActivatedRoute,
      private LoadingBar: LoadingBarService
    ) { 
      try {const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {example: string[2]};
    this.nombre = state.example[0];
    this.correo = state.example[1];
    this.tipo = state.example[2];}
      catch(error){
        this.router.navigate(['login']);
      }
    }
  
    ngOnInit() {
      //localStorage.clear(); // DELETE THIS AFTER IMPLEMENTING A CORRECT LOGOUT
      this.isEnglish = (localStorage.getItem("idioma")) === "true";
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

      const validarQueSeanIguales: ValidatorFn = (
        control: FormGroup
      ): ValidationErrors | null => {
        const clave = control.get("clave")
        const confirma_clave = control.get("confirma_clave")
      
        return clave.value === confirma_clave.value
          ? null
          : { noSonIguales: true }
      }
  
      this.form = this.formBuilder.group({
        clave: [null, [Validators.required, Validators.minLength(8), Validators.pattern("[0-9a-zA-Z]*")]],
        confirma_clave: [null, [Validators.required]],
      },
      {
        validators: validarQueSeanIguales,
      })

    }

    checarSiSonIguales(): boolean {
      return this.form.hasError('noSonIguales') &&
        this.form.get('clave').dirty &&
        this.form.get('confirma_clave').dirty;
    }
    
    registrarte(){
      this.LoadingBar.start();
      localStorage.clear();
      this.router.navigate(['dashboard']);
      this.LoadingBar.stop();
    }
  
    regreso(){
      this.LoadingBar.start();
      this.router.navigate(['login']);
      this.LoadingBar.stop();
    }
    
  
  }

