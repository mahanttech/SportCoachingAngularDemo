﻿/* tslint:disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v11.17.3.0 (NJsonSchema v9.10.46.0 (Newtonsoft.Json v9.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export class BaseClient {
  //private oAuthService: OAuthService;
  //private errorService: ErrorService;
  private router: Router

  constructor() {
    //this.oAuthService = Globals.injector.get(OAuthService);
    //this.errorService = Globals.injector.get(ErrorService);
    //this.router = Globals.injector.get(Router);
  }

  protected transformOptions(options: any) {
    const timestamp = new Date();
    options.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
      //'Authorization': this.oAuthService.authorizationHeader(),
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'X-Proact-Timezone-Offset-Mins': (timestamp.getTimezoneOffset() * -1).toString()
    });
    return Promise.resolve(options);
  }

  protected transformResult(url: string, response: HttpResponse<Blob>, processor: (response: HttpResponse<Blob>) => any): Observable<any> {
    try {
     
      if (!response.ok) {
        if (response.status >= 500) {
          try {
            let error = response.body as any;

            if (!environment.production && error && error.message) { 
        //      this.errorService.raiseError(error);
            } else {
              this.router.navigate(['/error/internal-server']);
            }
          } catch (e) {
            this.router.navigate(['/error/internal-server']);
          }
        }
        else {
          switch (response.status) {
            case 403:
              this.router.navigate(['/error/access-denied']);
              break;
            case 401:
              this.router.navigate(['/error/token']);
              break;
            case 409:
              break;
          }
        }
      }
      return processor(response);
    }
    catch (e) {
      //this.errorService.raiseError(e);
    }
  }
}

export interface IClient {
    /**
     * @return Success
     */
    getTestList(): Observable<void>;
    /**
     * @id (optional) 
     * @return Success
     */
    getTestDetailsWithId(id: number): Observable<void>;
    /**
     * @mstTestModel (optional) 
     * @return Success
     */
    insertUpdateTest(mstTestModel: MstTestModel): Observable<void>;
    /**
     * @id (optional) 
     * @return Success
     */
    deleteTest(id: number): Observable<void>;
    /**
     * @return Success
     */
    getAthleteList(): Observable<void>;
    /**
     * @testAthleteMappingModel (optional) 
     * @return Success
     */
    insertUpdateAthlete(testAthleteMappingModel: TestAthleteMappingModel): Observable<void>;
    /**
     * @id (optional) 
     * @return Success
     */
    deleteAthlete(id: number): Observable<void>;
    /**
     * @userDto (optional) 
     * @return Success
     */
    authenticate(userDto: SystemUsersModel): Observable<void>;
    /**
     * @systemUsersModel (optional) 
     * @return Success
     */
    register(systemUsersModel: SystemUsersModel): Observable<void>;
    /**
     * @return Success
     */
    getById(id: number): Observable<void>;
}

@Injectable()


export class MstTestModel implements IMstTestModel {
    id?: number;
    noOfParticipant?: number;
    testType: string;
    testDate: Date;

    constructor(data?: IMstTestModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.noOfParticipant = data["noOfParticipant"];
            this.testType = data["testType"];
            this.testDate = data["testDate"] ? new Date(data["testDate"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): MstTestModel {
        data = typeof data === 'object' ? data : {};
        let result = new MstTestModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["noOfParticipant"] = this.noOfParticipant;
        data["testType"] = this.testType;
        data["testDate"] = this.testDate ? this.testDate.toISOString() : <any>undefined;
        return data; 
    }
}

export interface IMstTestModel {
    id?: number;
    noOfParticipant?: number;
    testType: string;
    testDate: Date;
}

export class TestAthleteMappingModel implements ITestAthleteMappingModel {
    id?: number;
    athleteId: number;
    testId: number;
    athleteName?: string;
    distance: number;
    fitnessRating?: string;

    constructor(data?: ITestAthleteMappingModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.athleteId = data["athleteId"];
            this.testId = data["testId"];
            this.athleteName = data["athleteName"];
            this.distance = data["distance"];
            this.fitnessRating = data["fitnessRating"];
        }
    }

    static fromJS(data: any): TestAthleteMappingModel {
        data = typeof data === 'object' ? data : {};
        let result = new TestAthleteMappingModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["athleteId"] = this.athleteId;
        data["testId"] = this.testId;
        data["athleteName"] = this.athleteName;
        data["distance"] = this.distance;
        data["fitnessRating"] = this.fitnessRating;
        return data; 
    }
}

export interface ITestAthleteMappingModel {
    id?: number;
    athleteId: number;
    testId: number;
    athleteName?: string;
    distance: number;
    fitnessRating?: string;
}

export class SystemUsersModel implements ISystemUsersModel {
    id?: number;
    username?: string;
    password?: string;
    token?: string;
    message?: string;

    constructor(data?: ISystemUsersModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.username = data["username"];
            this.password = data["password"];
            this.token = data["token"];
            this.message = data["message"];
        }
    }

    static fromJS(data: any): SystemUsersModel {
        data = typeof data === 'object' ? data : {};
        let result = new SystemUsersModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["username"] = this.username;
        data["password"] = this.password;
        data["token"] = this.token;
        data["message"] = this.message;
        return data; 
    }
}

export interface ISystemUsersModel {
    id?: number;
    username?: string;
    password?: string;
    token?: string;
    message?: string;
}

export class SwaggerException extends Error {
    message: string;
    status: number; 
    response: string; 
    headers: { [key: string]: any; };
    result: any; 

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if(result !== null && result !== undefined)
        return Observable.throw(result);
    else
        return Observable.throw(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader(); 
            reader.onload = function() { 
                observer.next(this.result);
                observer.complete();
            }
            reader.readAsText(blob); 
        }
    });
}

/* tslint:disable */
////
//