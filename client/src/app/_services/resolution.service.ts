import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Resolution } from '../_models/resolution';

@Injectable({
  providedIn: 'root'
})
export class ResolutionService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient, private router: Router) { }

  addNewResolution(model: Resolution) {
    return this.http.post<Resolution>(this.baseUrl + 'resolutions', model);
  }

  getResolutionById(id: number) {
    return this.http.get<Resolution>(this.baseUrl + 'resolutions/' + id);
  }

  updateResolution(resolution: Resolution) {
    return this.http.put(this.baseUrl + 'resolutions', resolution);
  }

  deleteResolution(id: number) {
    return this.http.delete(this.baseUrl + 'resolutions/' + id);
  }
}
