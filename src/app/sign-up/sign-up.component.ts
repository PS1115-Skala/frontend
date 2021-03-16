import { Component, OnInit, ViewChild, TemplateRef, NgModule, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AppService } from 'app/app.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NgbModal, NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    public form: FormGroup;
    public error: boolean;
    public datos: any;
    @ViewChild("myModalInfo", {static: false}) myModalInfo: TemplateRef<any>;

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private appService: AppService,
      private route: ActivatedRoute,
      private LoadingBar: LoadingBarService,
      private modalService: NgbModal,
      private changeDetector : ChangeDetectorRef
    ) { 
    }
  
    ngOnInit() {
      this.error = false;
  
      this.form = this.formBuilder.group({
        //usbId: [null, [Validators.required, Validators.pattern("[0-9][0-9]-[0-9]{5}"), Validators.maxLength(8), Validators.minLength(8)]],
        usbId: [null, [Validators.required]],
        clave: [null, [Validators.required]],
        check: false
      })
    }

    async onSubmit() {
      this.LoadingBar.start();
      if (this.form.valid) {
        await this.appService.datosUsuario(this.form.value.usbId,this.form.value.clave).then(datos => {
          this.datos = datos;
          const navigationExtras: NavigationExtras = {state: {example: [this.datos.name, this.datos.usbId, this.datos.userType]}};
          this.router.navigate(['sign-up-final'], navigationExtras);
        }).catch(error => {
          this.changeDetector.detectChanges();
          this.modalService.open(this.myModalInfo);
          this.form.reset();
          this.LoadingBar.stop();
        })
        this.LoadingBar.stop();
      }
    }
  }

