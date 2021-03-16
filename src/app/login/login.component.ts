import { Component, OnInit, ViewChild, TemplateRef, NgModule, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AppService } from 'app/app.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NgbModal, NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  navbarOpen = false;
  @ViewChild("myModalInfo", {static: false}) myModalInfo: TemplateRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appService: AppService,
    private LoadingBar: LoadingBarService,
    private modalService: NgbModal,
    private changeDetector : ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      //usbId: [null, [Validators.required, Validators.pattern("[0-9][0-9]-[0-9]{5}"), Validators.maxLength(8), Validators.minLength(8)]],
      usbId: [null, [Validators.required]],
      clave: [null, [Validators.required]],
      check: false
    })
  }

  async onSubmit(values) {
    this.LoadingBar.start();
    if (this.form.valid) {
      // Falta arreglar esta entrada del login

      /*await this.appService.login(values.usbId).then(users => {
        const user = users[0];
      });*/
      await this.appService.loginPost(values.usbId, values.clave).then(users => {
        const user = users[0];
        this.router.navigate(['dashboard']);
        this.LoadingBar.stop();
      }).catch(error => {
        this.form.reset();
        setTimeout (() => {
          this.modalService.open(this.myModalInfo);
       });
        //this.ngOnInit();
        this.LoadingBar.stop();
      });
    }
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  vinculo(){
    this.LoadingBar.start();
    this.router.navigate(['recover-password']);
    this.LoadingBar.stop();
  }

}
