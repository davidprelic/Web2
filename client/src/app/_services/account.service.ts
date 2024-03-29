import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditProfile } from '../_models/edit-profile';
import { User } from '../_models/user';
import { UserAccount } from '../_models/user-account';
import { UserChangeState } from '../_models/user-change-state';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  getProfile(model: string){
    return this.http.get<EditProfile>(this.baseUrl + "Account/" + model);
  }

  getAccount(model: string){
    return this.http.get<UserAccount>(this.baseUrl + "Account/allInfo/" + model);
  }

  editProfile(model: any){
    return this.http.put(this.baseUrl + "Account/EditProfile", model)
  }

  changeAccountStatus(model: any){
    return this.http.put(this.baseUrl + "Account", model )
  }

  getAllUsers() {
    return this.http.get<UserChangeState[]>(this.baseUrl + 'Account/users');
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'Account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'Account/register', model).pipe(
      /*map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })*/
    )
  }

  setCurrentUser(user: User) {
    // user.roles = [];
    // const roles = this.getDecodedToken(user.token).role;
    // Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));   
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  
}
