import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from './global';
import { map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class RestActivityService {


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

    addActivity(activity: Activity, userId: string): Observable<any> {
        const token = this.cookieService.get('token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        let params = JSON.stringify(activity);
        return this.http.post(`${this.uri}saveActivity/${userId}`, params, { headers })
        .pipe(map((res: any) => this.extractData(res)));
    }

  
      deleteActivity(activityId: string, userId: string): Observable<any> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.cookieService.get('token')
        });
        return this.http.delete(`${this.uri}deleteActivity/${activityId}/${userId}`, { headers })
          .pipe(map((res: any) => this.extractData(res)));
      }
}
