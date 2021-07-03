import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Call } from '../_models/call';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient, private router: Router) { }

  addNewCall(model: Call) {
    return this.http.post<Call>(this.baseUrl + 'calls', model);
  }

  getCalls() {
    return this.http.get<Call[]>(this.baseUrl + 'calls')
  }

  getCallsByIncidentId(id: number) {
    return this.http.get<Call[]>(this.baseUrl + 'calls/incident/' + id)
  }


  getCallById(id: number) {
    return this.http.get<Call>(this.baseUrl + 'calls/' + id);
  }

  updateCall(call: Call) {
    return this.http.put(this.baseUrl + 'calls', call);
  }

  deleteCall(id: number) {
    return this.http.delete(this.baseUrl + 'calls/' + id);
  }
}
