import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Incident } from '../_models/incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient, private router: Router) { }

  addNewIncident(model: Incident) {
    return this.http.post<Incident>(this.baseUrl + 'incidents', model);
  }

  getIncidents() {
    return this.http.get<Incident[]>(this.baseUrl + 'incidents')
  }

  getIncidentsByUsername(username: string) {
    return this.http.get<Incident[]>(this.baseUrl + 'incidents/mine/' + username);
  }

  getIncidentById(id: number) {
    return this.http.get<Incident>(this.baseUrl + 'incidents/' + id);
  }

  updateIncident(incident: Incident) {
    var user = JSON.parse(localStorage.getItem('user'));
    return this.http.put(this.baseUrl + 'incidents/' + user.username, incident);
  }

  deleteIncident(id: number) {
    var user = JSON.parse(localStorage.getItem('user'));
    return this.http.delete(this.baseUrl + 'incidents/' + id + "/" + user.username);
  }

}
