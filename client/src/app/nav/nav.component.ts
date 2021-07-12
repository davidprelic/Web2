import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userRole: string;
  
  constructor(public toastrService: ToastrService, public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('user'));
    this.userRole = user.userRole;
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.toastrService.warning('You logged out');
  }

}
