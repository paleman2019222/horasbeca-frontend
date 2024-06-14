import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from './global';
import { map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RestUserService {
  public token: any;
  public user: string | null="";
  public uri:any;
  public role:any;

  public httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.cookieService.get('token')
    })
  }

  public extractData(res: Response){
    let body = res;
    return body || [] || {}
  }

  constructor(private http: HttpClient, private cookieService: CookieService) { 
    this.uri = CONNECTION.URI;
  }

  getUser(){
    let userCookie = this.cookieService.get('user');
    if(userCookie){
      let user = JSON.parse(userCookie);

      if(user){
        this.user = user;
      }else{
        this.user= null;
      }
    }else{
      this.user=null;
    }
    return this.user;
  }

  login(userData:{email:string, password:string}, tokenStatus:boolean){
    let user ={
      ...userData,
      gettoken:tokenStatus
    };
    let params = JSON.stringify(user);
    return this.http.post(this.uri+'login', params, this.httpOptionsAuth)
    .pipe(map((res:any)=>this.extractData(res)));
  }

  getUserActivities(userId: string): Observable<any> {
    return this.http.get(`${this.uri}getUserActivities/${userId}`, this.httpOptionsAuth)
    .pipe(map((res:any) => this.extractData(res)));
  }
  //metodo que llama al backend
  getUserAllActivities(userId: string): Observable<any> {
    return this.http.get(`${this.uri}getAllActivities/${userId}`, this.httpOptionsAuth)
    .pipe(map((res:any) => this.extractData(res)));
  }
}
