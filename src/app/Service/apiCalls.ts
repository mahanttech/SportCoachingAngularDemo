import { Injectable } from '@angular/core';
import { TokenParams } from './token-params';
import { SystemUsersModel, MstTestModel, TestAthleteMappingModel } from 'api/apiclient';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class APICallsService{
headers;    
url:string="http://localhost:49360/api/";
    constructor(
        private  http:HttpClient,
    ) {
        let tokenKey=this.GetValueFromLocalStorage().token;
         this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+tokenKey
        })
      }



      

public AuthenticateUser(systemUsersModel:SystemUsersModel):Observable<any>{
    let options = { headers: this.headers };
    return this.http.post(this.url+"users/Authenticate",systemUsersModel,options)
    .map((result:Response)=>result);
}

getTestList(): Observable<any> {
    let url_ = this.url + "test/TestList";
    return this.http.get(url_,{headers:this.headers}).map((result:Response)=>result);
}

getTestDetailsWithId(id: number): Observable<any> {
    let url_ = this.url + "test/TestDetails?";
    if (id !== undefined)
    url_ += "id=" + encodeURIComponent("" + id); 
    return this.http.get(url_,{headers:this.headers}).map((result:Response)=>result);
}

insertUpdateTest(mstTestModel: MstTestModel): Observable<any> {
    let url_ = this.url + "test/AddUpdateTest";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(mstTestModel);
    let options = { headers: this.headers };
    return this.http.post(url_,mstTestModel,options)
    .map((result:Response)=>result);

    };

    getAthleteList(): Observable<any> {
        let url_ = this.url + "test/AthleteList";
        return this.http.get(url_,{headers:this.headers}).map((result:Response)=>result);
    }

    insertUpdateAthlete(testAthleteMappingModel: TestAthleteMappingModel): Observable<any> {
        let url_ = this.url + "test/AddUpdateAthlete";
        const content_ = JSON.stringify(testAthleteMappingModel);
        let options = { headers: this.headers };
        return this.http.post(url_,testAthleteMappingModel,options)
    .map((result:Response)=>result);

    }

    deleteAthlete(id: number): Observable<any> {
        let url_ = this.url + "test/DeleteAthlete?";
        if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&"; 
        url_ = url_.replace(/[?&]$/, "");
        return this.http.get(url_,{headers:this.headers}).map((result:Response)=>result);

    }

    deleteTest(id: number): Observable<any> {
        let url_ = this.url + "test/DeleteTest?";
        if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&"; 
            url_ = url_.replace(/[?&]$/, "");
            return this.http.get(url_,{headers:this.headers}).map((result:Response)=>result);
    }


public GetValueFromLocalStorage():SystemUsersModel{
    let tokendata=JSON.parse(localStorage.getItem("Authorization"));
    return tokendata==null? null:tokendata;
}


}