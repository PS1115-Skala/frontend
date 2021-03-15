import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AppService } from 'app/app.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';


@Component({
  selector: 'app-change-password-final',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    public form: FormGroup;
   
  
    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private appService: AppService,
      private route: ActivatedRoute,
      private LoadingBar: LoadingBarService
    ) { 
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
        this.router.navigate(['login']);
    }
  }