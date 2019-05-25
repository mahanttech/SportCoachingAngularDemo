import { environment } from 'environments/environment';
/* tslint:disable */
//import { OAuthService } from 'angular-oauth2-oidc';
//import { Globals } from './../app/globals';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable'; // ignore
import { HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http'; // ignore
//import { ErrorService } from '../app/shared/error/error.service';

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
