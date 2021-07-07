import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HistorySafetyDoc } from '../_models/history-safety-doc';

@Injectable({
  providedIn: 'root'
})
export class HistorySafetyDocService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient, private router: Router) { }

  addNewHistorySafetyDoc(model: HistorySafetyDoc) {
    return this.http.post<HistorySafetyDoc>(this.baseUrl + 'historysafetydocs', model);
  }

  getHistorySafetyDocById(id: number) {
    return this.http.get<HistorySafetyDoc>(this.baseUrl + 'historysafetydocs/' + id);
  }

  updateHistorySafetyDoc(historySafetyDoc: HistorySafetyDoc) {
    return this.http.put(this.baseUrl + 'historysafetydocs', historySafetyDoc);
  }

  deleteHistorySafetyDoc(id: number) {
    return this.http.delete(this.baseUrl + 'historysafetydocs/' + id);
  }
}
