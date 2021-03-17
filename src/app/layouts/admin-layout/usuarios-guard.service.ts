import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { AppService } from "app/app.service";
import { USER_TYPE } from "app/interfaces/user";

@Injectable()
export class UsuariosGuardService implements CanActivate {
 
    constructor(private router:Router, private service: AppService ) {}
 
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean|UrlTree> {
        return new Promise( resolve => {
            this.service.isUserType(USER_TYPE.LAB_F).then(isLabF => { 
                if ( isLabF == false) {
                    alert('You are not allowed to view this page. You are redirected to Dashboard Page');
                    this.router.navigate(["dashboard"]);
                    resolve(false);
                } 
             
                resolve(true);
            });

        })
    }
 
}