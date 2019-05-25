import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { IClient, SystemUsersModel } from 'api/apiclient';
import { APICallsService } from 'app/Service/apiCalls';
import { LocalStorageService } from 'app/Service/localStorageService';
import { Router } from '@angular/router';
// import { TokenParams } from '../../../../../../app/Auth/token-params';//05/16/2018
// import { AuthService } from '../../../../../../app/Auth/auth.service';//05/16/2018
// import { LocalStorageService } from '../../../../../../app/Auth/localStorageService';//05/16/2018
// import { Router, ActivatedRoute } from '@angular/router';//05/16/2018
// import { UserAccountClient, MstOTPModel } from '../../../../../../api/apiclient'
// import { ToastrService } from 'ngx-toastr';


// import { SimpleNotificationsModule } from 'angular2-notifications';
// import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'fuse-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations,
            
    
})
export class FuseLoginComponent implements OnInit {
    loginForm: FormGroup;
    loginFormErrors: any;
    _systemUsersModel:SystemUsersModel;
    
    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private aPICallsService:APICallsService,
         private router: Router,
         private localStorageService: LocalStorageService,
    ) {
        {
            this._systemUsersModel=new SystemUsersModel();
            // Configure the layout
            this.fuseConfig.config = {
                layout: {
                    navbar   : {
                        hidden: true
                    },
                    toolbar  : {
                        hidden: true
                    },
                    footer   : {
                        hidden: true
                    },
                    sidepanel: {
                        hidden: true
                    }
                }
            };
        }
        this.loginFormErrors = {
            email: {},
            password: {}
        };
    }
    //Login Function 05/16/2018
    // _tokenParams: TokenParams
    lgusername: string;
    lgpassword: string;
    // toaster(){
    //     this.notif.success(
    //         'Success',
    //         'Welcome ChurchShield',
    //       )
    // }
   
    DoLogin(): void {
        this._systemUsersModel.username = this.lgusername;
        this._systemUsersModel.password = this.lgpassword;
        
        this.aPICallsService.AuthenticateUser(this._systemUsersModel).subscribe(data => {
            this.localStorageService.SetAuthorizationData(data);
            this.router.navigate(['SportTest/TestListComponent']);
        }, (error) => {
            debugger;
            console.log(error + "Auth Service(Login)-Error");
        });
    }

    
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            lgusername: ['', [Validators.required]],
            lgpassword: ['', Validators.required]
        });
        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }
    onLoginFormValuesChanged() {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }
            // Clear previous errors
            this.loginFormErrors[field] = {};
            // Get the control
            const control = this.loginForm.get(field);
            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        } 
    }
}
