import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule  } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseLoginComponent } from './login.component';
import { APICallsService } from 'app/Service/apiCalls';
import { LocalStorageService } from 'app/Service/localStorageService';
import { NotificationsService } from 'angular2-notifications';


const routes = [
    {
        path     : 'auth/login',
        component: FuseLoginComponent
        
    }
];

@NgModule({
    declarations: [
        FuseLoginComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule
    ],
    providers:[APICallsService,LocalStorageService],
})
export class LoginModule
{
}
