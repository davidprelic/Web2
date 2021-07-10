import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangeRead } from '../_models/change-read';
import { NotificationUser } from '../_models/notification-user';
import { NotificationUsersService } from '../_services/notification-user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: NotificationUser[];
  filteredNotifications: NotificationUser[];
  tempNotifications: NotificationUser[];
  changeToRead: ChangeRead;
  readNotifications: string = "all";
  typeNotifications: string = "all";

  constructor(private toastrService: ToastrService, private router: Router, private notificationService: NotificationUsersService, private http: HttpClient) { }

  ngOnInit(): void {
    this.changeToRead = {id:0,username:""}
    var user = JSON.parse(localStorage.getItem('user'));
    this.notificationService.getNotifications(user.username).subscribe(response =>{
      this.notifications = response;
      this.filteredNotifications = response;

      this.notifications.forEach(element => {
        if(element.type == "Error"){
          element.color = 'warn';
        }else if(element.type == "Success"){
          element.color = 'accent';
        }else if(element.type == "Info"){
          element.color = 'primary';
        }else{
          element.color = undefined;
        }
      });
      this.filterNotifications();
    });

  }

  ReadNotification(id: number){
    var user = JSON.parse(localStorage.getItem('user'));
    this.changeToRead.id = id;
    this.changeToRead.username = user.username;
    this.notificationService.changeToRead(this.changeToRead).subscribe(response=>{
      this.toastrService.success("Notification changed to read");
    },
    err=>{
      this.toastrService.error("Notification is already read");
    });
  }

  filterNotifications(){
    this.filteredNotifications = [];
    this.tempNotifications = [];
    if(this.readNotifications == "all"){
      this.tempNotifications = this.notifications;
    }else if(this.readNotifications == "read"){
      this.notifications.forEach(element => {
        if(element.read == true){
          this.tempNotifications.push(element);
        }
      });
    }
    else{
      this.notifications.forEach(element => {
        if(element.read == false){
          this.tempNotifications.push(element);
        }
      });
    }

    if(this.typeNotifications == "all"){
      this.filteredNotifications = this.tempNotifications;
    }
    else if(this.typeNotifications == "warnings"){
      this.tempNotifications.forEach(element => {
        if(element.type == "Warning"){
          this.filteredNotifications.push(element);
        }
      });
    }else if(this.typeNotifications == "errors"){
      this.tempNotifications.forEach(element => {
        if(element.type == "Error"){
          this.filteredNotifications.push(element);
        }
      });
    }else if(this.typeNotifications == "success"){
      this.tempNotifications.forEach(element => {
        if(element.type == "Success"){
          this.filteredNotifications.push(element);
        }
      });
    }
    else{
      this.tempNotifications.forEach(element => {
        if(element.type == "Info"){
          this.filteredNotifications.push(element);
        }
      });
    }

    this.sortNotifications();
  }

  sortNotifications(){
    this.tempNotifications = this.filteredNotifications.sort((a, b) => new Date(a.dateTimeCreated).getTime() - new Date(b.dateTimeCreated).getTime());
    this.filteredNotifications = this.tempNotifications;
  }

}
