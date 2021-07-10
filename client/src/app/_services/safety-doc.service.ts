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

  getSafetyDocById(id: number) {
    return this.http.get<SafetyDocument>(this.baseUrl + 'safetydocs/' + id);
  }

  updateSafetyDoc(safetyDoc: SafetyDocument) {
    return this.http.put(this.baseUrl + 'safetydocs', safetyDoc);
  }

  deleteSafetyDoc(id: number) {
    return this.http.delete(this.baseUrl + 'safetydocs/' + id);
  }
  
}
