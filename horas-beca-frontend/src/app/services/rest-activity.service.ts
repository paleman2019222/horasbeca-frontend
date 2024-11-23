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
  public user: string | null = "";
  public uri: any;
  public role: any;

  public httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.cookieService.get('token')
    })
  }

  getUser() {
    let userCookie = this.cookieService.get('user');
    if (userCookie) {
      let user = JSON.parse(userCookie);

      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    } else {
      this.user = null;
    }
    return this.user;
  }

  public extractData(res: Response) {
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

  //Conectando con el backend la url de eliminar una actividad
  deleteActivity(activityId: string, userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.cookieService.get('token')
    });
    return this.http.delete(`${this.uri}deleteActivity/${activityId}/${userId}`, { headers })
      .pipe(map((res: any) => this.extractData(res)));
  }
  //Conectando con el backend la url de asignar una actividad
  assingActivity(adminID: string, activityId: string, userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.cookieService.get('token')
    });
    return this.http.delete(`${this.uri}assignActivity/${adminID}/${activityId}/${userId}`, { headers })
      .pipe(map((res: any) => this.extractData(res)));
  }
  //Obtiene todos los usuarios
  getAllUsers(userId: string): Observable<any> {
    return this.http.get(`${this.uri}getAllUsers/${userId}`, this.httpOptionsAuth)
      .pipe(map((res: any) => this.extractData(res)));
  }

  getActivityUsers(activityId: string, userId: string): Observable<any> {
    return this.http.get(`${this.uri}getActivityUsers/${activityId}/${userId}`, this.httpOptionsAuth)
      .pipe(map((res: any) => this.extractData(res)));
  }

  unassignActivity(adminId: string, activityId: string, userId: string): Observable<any> {
    return this.http.post(`${this.uri}unassignActivity/${adminId}/${activityId}/${userId}`, {}, this.httpOptionsAuth)
      .pipe(map((res: any) => this.extractData(res)));
  }


  assignActivity(adminId: string, activityId: string, userId: string): Observable<any> {
    return this.http.put(`${this.uri}assignActivity/${adminId}/${activityId}/${userId}`, {}, this.httpOptionsAuth)
      .pipe(map((res: any) => this.extractData(res)));
  }

  assignByStudent(activityId: string, studentId: string): Observable<any> {
    return this.http.put(`${this.uri}assignByStudent/${activityId}/${studentId}`, {}, this.httpOptionsAuth)
      .pipe(map((res: any) => this.extractData(res)));
  }

  //Obtener las actividades
  getAllActivities(userId: string): Observable<any> {
    return this.http.get(`${this.uri}getAllActivitiesU/${userId}`, this.httpOptionsAuth)
    .pipe(map((res:any) => this.extractData(res)));
  }

  getActivityQR(activityId: string): Observable<Blob> {
    const url = `${this.uri}/activityqr/${activityId}`;
    const headers = new HttpHeaders({
        'Authorization': this.cookieService.get('token')
    });

    return this.http.get(url, { headers, responseType: 'blob' });
}

}
