import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryWorkRequest } from '../_models/history-work-request';

@Injectable({
  providedIn: 'root'
})
export class HistoryWorkRequestService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient, private router: Router) { }

  addNewHistoryWorkRequest(model: HistoryWorkRequest) {
    return this.http.post<HistoryWorkRequest>(this.baseUrl + 'HistoryWorkRequest', model);
  }

  getHistoryWorkRequestById(id: number) {
    return this.http.get<HistoryWorkRequest>(this.baseUrl + "HistoryWorkRequest/" + id);
  }

  getHistoryWorkRequestByWorkRequestId(id: number) {
    return this.http.get<HistoryWorkRequest[]>(this.baseUrl + 'HistoryWorkRequest/work-request/' + id)
  }

  updateHistoryWorkRequest(historyWorkRequest: HistoryWorkRequest) {
    return this.http.put(this.baseUrl + 'HistoryWorkRequest', historyWorkRequest);
  }

  deleteHistoryWorkRequest(id: number) {
    return this.http.delete(this.baseUrl + 'HistoryWorkRequest/' + id);
  }
}
