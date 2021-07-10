import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Call } from '../_models/call';
import { NotificationUser } from '../_models/notification-user';

@Injectable({
    providedIn: 'root'
  })
  export class NotificationUsersService {
    baseUrl = 'https://localhost:5001/api/notificationusers/';
  
    constructor(private http: HttpClient, private router: Router) { }
  
    getNotifications(model: any){
      return this.http.get<NotificationUser[]>(this.baseUrl + model)
    }
  
    changeToRead(model: any){
        return this.http.put(this.baseUrl, model);
    }
    /*getCallsByIncidentId(id: number) {
      return this.http.get<Call[]>(this.baseUrl + id)
    }
  
  
    getCallById(id: number) {
      return this.http.get<Call>(this.baseUrl + id);
    }
  
    updateCall(call: Call) {
      return this.http.put(this.baseUrl, call);
    }
  
    deleteCall(id: number) {
      return this.http.delete(this.baseUrl + id);
    }*/
  }