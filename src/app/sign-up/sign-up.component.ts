import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AppService } from 'app/app.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    public isEnglish: boolean;
    public title: string;
    public titulo: string;
    public links: any[]; // url - text
    public direccionSartenejas: string;
    public direccionCamuri: string;
    public contacto: string;
    public rights: string;
    public rightLink: string;
    public form: FormGroup;
    public nota: string;
    public note: string;
    public error: boolean;
    public datos: any;
  
    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private appService: AppService,
      private route: ActivatedRoute,
      private LoadingBar: LoadingBarService
    ) { 
      /*try {const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {example: string};
    this.isEnglish = Boolean(state.example);
      }
      catch(error){
        this.router.navigate(['login']);
      }*/
    }
  
    ngOnInit() {
      //localStorage.clear(); // DELETE THIS AFTER IMPLEMENTING A CORRECT LOGOUT
      this.isEnglish = (localStorage.getItem("idioma")) === "true";
      this.error = false;
      this.title = "Please indicate your USBID and Institutional Password.";
      this.titulo = "Por favor, indique su USBID y Contraseña institucional.";
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
      this.nota = "Atención: No almacenaremos su contraseña institucional en nuestro sistema."
      this.note = "Attention: We will not store your institutional password in our system."
  
      this.form = this.formBuilder.group({
        //usbId: [null, [Validators.required, Validators.pattern("[0-9][0-9]-[0-9]{5}"), Validators.maxLength(8), Validators.minLength(8)]],
        usbId: [null, [Validators.required]],
        clave: [null, [Validators.required]],
        check: false
      })
    }

    async onSubmit() {
      // console.log(values);
      //alert("error");
      this.LoadingBar.start();
      if (this.form.valid) {
        await this.appService.datosUsuario(this.form.value.usbId,this.form.value.clave).then(datos => {
          this.datos = datos;
          const navigationExtras: NavigationExtras = {state: {example: [this.datos.name, this.datos.usbId, this.datos.userType]}};
          this.router.navigate(['sign-up-final'], navigationExtras);
        }).catch(error => {
          //console.log(error);
          alert(error.error.error);
          this.ngOnInit();
          this.LoadingBar.stop();

       // this.datos = this.appService.datosUsuario(this.form.value.usbId,this.form.value.clave);
        //this.datos_usuario[0] = "1";
        //console.log(this.datos_usuario[0]);
        //const navigationExtras: NavigationExtras = {state: {example: ["Cristopher", "15-10172", "Estudiante"]}};
        
        })
        this.LoadingBar.stop();
      }
    }

  
    regreso(){
      this.LoadingBar.start();
      localStorage.clear();
      this.router.navigate(['login']);
      this.LoadingBar.stop();
    }
  
  
  }

