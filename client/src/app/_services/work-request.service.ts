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
      return this.http.post<WorkRequest>(this.baseUrl, model);
    }
  
    getWorkRequests() {
      return this.http.get<WorkRequest[]>(this.baseUrl)
    }
  
    getWorkRequestById(id: number) {
      return this.http.get<WorkRequest>(this.baseUrl + id);
    }
  
    updateWorkRequest(model: WorkRequest) {
      return this.http.put(this.baseUrl, model);
    }
  
    deleteWorkRequest(id: number) {
      return this.http.delete(this.baseUrl + id);
    }
  
  }