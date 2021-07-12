import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SafetyDocument } from '../_models/safety-document';

@Injectable({
  providedIn: 'root'
})
export class SafetyDocService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient, private router: Router) { }

  addNewSafetyDoc(model: SafetyDocument) {
    return this.http.post<SafetyDocument>(this.baseUrl + 'safetydocs', model);
  }

  getSafetyDocs() {
    return this.http.get<SafetyDocument[]>(this.baseUrl + 'safetydocs')
  }

  getSafetyDocsByUsername(username: string) {
    return this.http.get<SafetyDocument[]>(this.baseUrl + 'safetydocs/mine/' + username);
  }

  getSafetyDocById(id: number) {
    return this.http.get<SafetyDocument>(this.baseUrl + 'safetydocs/' + id);
  }

  updateSafetyDoc(safetyDoc: SafetyDocument) {
    var user = JSON.parse(localStorage.getItem('user'));
    return this.http.put(this.baseUrl + 'safetydocs/' + user.username, safetyDoc);
  }

  deleteSafetyDoc(id: number) {
    var user = JSON.parse(localStorage.getItem('user'));
    return this.http.delete(this.baseUrl + 'safetydocs/' + id + "/" + user.username);
  }
  
}
