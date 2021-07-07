import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { MapOptions, Map, tileLayer, latLng, ZoomAnimEvent, LeafletMouseEvent } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { CallService } from '../_services/call.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-report-outage',
  templateUrl: './report-outage.component.html',
  styleUrls: ['./report-outage.component.css']
})
export class ReportOutageComponent implements OnInit {
  model: any = {};
  reportOutageForm: FormGroup;
  private map: Map;
  private zoom: number;
  
  addrInfo = {};

  constructor(public accountService: AccountService, private fb: FormBuilder, 
    private router: Router, private http : HttpClient, private callService: CallService) { }

  ngOnInit(): void {
    this.initializeForm();
    if(this.accountService.currentUser$){
      this.loggedInEmail();
    }
  }

  loggedInEmail(){
    var model:any;
    if(localStorage.getItem('user') !== null){
      var user = JSON.parse(localStorage.getItem('user'))
      this.accountService.getProfile(user.username).subscribe(res =>{
        model = res;
        console.log(model);
        this.reportOutageForm = this.fb.group({
          email: [{value: model.retval.email, disabled: true}, [Validators.required, Validators.email]],
          location: [{value: 'Choose on map',disabled: true}, Validators.required],
          latitude: [{value: 'Choose on map',disabled: true}, Validators.required],
          longitude: [{value: 'Choose on map',disabled: true}, Validators.required],
          reason: ['', Validators.required],
          comment: ['', Validators.required],
          hazard: ['', Validators.required],
        })
      });  
    }
    
  }

  initializeForm() {
    this.reportOutageForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      location: [{value: 'Choose on map',disabled: true}, Validators.required],
      latitude: [{value: 'Choose on map',disabled: true}, Validators.required],
      longitude: [{value: 'Choose on map',disabled: true}, Validators.required],
      reason: ['', Validators.required],
      comment: ['', Validators.required],
      hazard: ['', Validators.required],
    })
  }

  receiveMap(map: Map) {
    this.map = map;
    this.map.setView(latLng(45.2329,19.7910), 12);

    this.map.on('click', <LeafletMouseEvent>(e) => { 
      this.reportOutageForm.get('latitude').setValue(e.latlng.lat);
      this.reportOutageForm.get('longitude').setValue(e.latlng.lng);
      
      this.http.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + e.latlng.lat + '&lon=' + e.latlng.lng).subscribe(response => {
        this.addrInfo = response["address"];
        this.reportOutageForm.get('location').setValue(this.addrInfo["road"] + ' ' + this.addrInfo["house_number"]);
      })

    });
  }
  
  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

  report() {
    this.callService.addNewCall(this.reportOutageForm.getRawValue()).subscribe(response =>{
      this.router.navigateByUrl('/');
    })
  }

  getErrorMessage(fControlName: string) {
    if (this.reportOutageForm.get(fControlName).hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.reportOutageForm.get(fControlName).hasError('email')) {
      return 'Not a valid email';
    }
    else {
      return '';
    }
  }


}
