import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AppService } from 'app/app.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';


@Component({
  selector: 'app-sign-up-final',
  templateUrl: './sign-up-final.component.html',
  styleUrls: ['./sign-up-final.component.scss']
})
export class SignUpFinalComponent implements OnInit {

    public form: FormGroup;
    public nombre: string;
    public correo: string;
    public tipo: string;
    public datos: any;
  
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
    
    async onSubmit(){
      
      this.LoadingBar.start();
      if (this.form.valid) {
        await this.appService.signUp(this.correo,this.form.value.clave, this.form.value.confirma_clave).then(datos => {
          this.datos = datos;
          this.router.navigate(['login']);
          this.LoadingBar.stop();
        }).catch(error => {
          alert(error.error.error);
          this.ngOnInit();
          this.LoadingBar.stop();
        });
      }
    }
  }

