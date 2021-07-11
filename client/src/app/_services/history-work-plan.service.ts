import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HistorySafetyDoc } from '../_models/history-safety-doc';
import { HistoryWorkPlan } from '../_models/history-work-plan';

@Injectable({
  providedIn: 'root'
})
export class HistoryWorkPlanService{
    baseUrl = 'https://localhost:5001/api/historyworkplan/'

    constructor(private http: HttpClient, private router: Router){

    }

    addNewHistoryWorkPlan(model: HistoryWorkPlan){
        return this.http.post<HistoryWorkPlan>(this.baseUrl, model);
    }

    getHistoryWorkPlanById(id: number){
        return this.http.get<HistoryWorkPlan>(this.baseUrl + id);
    }

    getHistoryWorkPlansByWorkPlanId(id: number){
        return this.http.get<HistoryWorkPlan[]>(this.baseUrl + "workplan/" +id);
    }

    updateHistoryWorkPlan(historyWorkPlan: HistoryWorkPlan){
        return this.http.put(this.baseUrl, historyWorkPlan);
    }

    deleteHistoryWorkPlan(id: number){
        return this.http.delete(this.baseUrl + id);
    }
}