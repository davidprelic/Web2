import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Checklist } from '../_models/checklist';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient, private router: Router) { }

  addNewChecklist(model: Checklist) {
    return this.http.post<Checklist>(this.baseUrl + 'checklists', model);
  }

  getChecklistById(id: number) {
    return this.http.get<Checklist>(this.baseUrl + 'checklists/' + id);
  }

  updateChecklist(checklist: Checklist) {
    return this.http.put(this.baseUrl + 'checklists', checklist);
  }

  deleteChecklist(id: number) {
    return this.http.delete(this.baseUrl + 'checklists/' + id);
  }
  
}
