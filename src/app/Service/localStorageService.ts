import { Injectable } from '@angular/core';
import { TokenParams } from './token-params';
import { SystemUsersModel } from 'api/apiclient';

@Injectable()

export class LocalStorageService{

public SetAuthorizationData(auth:SystemUsersModel):void{
    localStorage.setItem("Authorization",JSON.stringify(auth));
}

public GetValueFromLocalStorage():SystemUsersModel{
    let tokendata=JSON.parse(localStorage.getItem("Authorization"));
    return tokendata==null? null:tokendata;
}


}