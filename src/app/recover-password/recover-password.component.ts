import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AppService } from 'app/app.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
    public form: FormGroup;
    public datos: any;
  
    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private appService: AppService,
      private route: ActivatedRoute,
      private LoadingBar: LoadingBarService
    ) { 
    }
  
    ngOnInit() {
      this.form = this.formBuilder.group({
        //usbId: [null, [Validators.required, Validators.pattern("[0-9][0-9]-[0-9]{5}"), Validators.maxLength(8), Validators.minLength(8)]],
        usbId: [null, [Validators.required]],
        code: [null, [Validators.required]],
        check: false
      })
    }

    async onSubmit() {
      this.router.navigate(['change-password']);
    }
  
  
  }