import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Incident } from '../_models/incident';
import { WorkRequest } from '../_models/work-request';

@Injectable({
  providedIn: 'root'
})
export class WorkRequestService {
    baseUrl = 'https://localhost:5001/api/workrequest/';
  
    constructor(private http: HttpClient, private router: Router) { }
  
    addNewWorkRequest(model: WorkRequest) {
      var user = JSON.parse(localStorage.getItem('user'));
      return this.http.post<WorkRequest>(this.baseUrl + user.username, model);
    }
  
    getWorkRequests() {
      return this.http.get<WorkRequest[]>(this.baseUrl)
    }
  
    getWorkRequestById(id: number) {
      return this.http.get<WorkRequest>(this.baseUrl + id);
    }

    getWorkRequestsByUsername(username: string) {
      return this.http.get<WorkRequest[]>(this.baseUrl + 'mine/' + username);
    }
  
    updateWorkRequest(model: WorkRequest) {
      var user = JSON.parse(localStorage.getItem('user'));
      return this.http.put(this.baseUrl + user.username, model);
    }
  
    deleteWorkRequest(id: number) {
      var user = JSON.parse(localStorage.getItem('user'));
      return this.http.delete(this.baseUrl + id + "/" + user.username);
    }
  
  }