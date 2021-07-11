import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Incident } from '../_models/incident';
import { WorkPlan } from '../_models/work-plan';

@Injectable({
  providedIn: 'root'
})
export class WorkPlanService {
    baseUrl = 'https://localhost:5001/api/workplan/';
  
    constructor(private http: HttpClient, private router: Router) { }
  
    addNewWorkPlan(model: WorkPlan) {
      var user = JSON.parse(localStorage.getItem('user'));
      return this.http.post<WorkPlan>(this.baseUrl + user.username, model);
    }
  
    getWorkPlans() {
      return this.http.get<WorkPlan[]>(this.baseUrl)
    }
  
    getWorkPlanById(id: number) {
      return this.http.get<WorkPlan>(this.baseUrl + id);
    }
  
    updateWorkPlan(model: WorkPlan) {
      var user = JSON.parse(localStorage.getItem('user'));
      return this.http.put(this.baseUrl + user.username, model);
    }
  
    deleteWorkPlan(id: number) {
      var user = JSON.parse(localStorage.getItem('user'));
      return this.http.delete(this.baseUrl + id + "/" + user.username);
    }
  
  }