import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Crew } from '../_models/crew';
import { CrewItem } from '../_models/crew-item';

@Injectable({
  providedIn: 'root'
})
export class CrewService{
    baseUrl = "https://localhost:5001/api/Crew/"

    constructor(private http: HttpClient, private router: Router){
        
    }

    getCrews(){
        return this.http.get<CrewItem[]>(this.baseUrl);
    }

    addCrew(model: Crew){
        var user = JSON.parse(localStorage.getItem('user'));
        return this.http.post<Crew>(this.baseUrl + user.username, model);
    }

    getCrewAfterSearch(model: Crew){
        let params = new HttpParams();
        params = params.append("name", model.name);

        this.router.navigate(['/crews'], {queryParams: {name: model.name}})

        return this.http.get<CrewItem[]>(this.baseUrl + 'search', {params: params});
    }

    getCrewById(id: number) {
        return this.http.get<Crew>(this.baseUrl  + id);
      }

    updateCrew(crew: Crew){
        var user = JSON.parse(localStorage.getItem('user'));
        return this.http.put(this.baseUrl + user.username, crew);
    }

    deleteCrew(id: number) {
        var user = JSON.parse(localStorage.getItem('user'));
        return this.http.delete(this.baseUrl + id + "/" + user.username);
      }
}