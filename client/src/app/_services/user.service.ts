import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CrewChangeUser } from '../_models/crew-change-user';
import { CrewMember } from '../_models/crew-member';

@Injectable({
  providedIn: 'root'
})
export class UserService{
    baseUrl = "https://localhost:5001/api/Users/"

    constructor(private http: HttpClient, private router: Router){
        
    }

    getCrewMembers(id: number){
        return this.http.get<CrewMember[]>(this.baseUrl + 'crewMembers/' + id);
    }

    getUserById(id: number) {
      return this.http.get<CrewMember>(this.baseUrl  + id);
    }

    getUsersByCrewId(id: number) {
      return this.http.get<CrewMember[]>(this.baseUrl + 'crew/' + id)
    }

    updateCrewMember(crewMember: CrewChangeUser){
      return this.http.put(this.baseUrl, crewMember);
  }
    
}