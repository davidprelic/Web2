import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { MapOptions, Map, tileLayer, latLng, ZoomAnimEvent, LeafletMouseEvent } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { EditProfile } from '../_models/edit-profile';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  private map: Map;
  private zoom: number;
  updateProfile: EditProfile;

  addrInfo = {};

  constructor(private toastrService: ToastrService, private http: HttpClient,private fb: FormBuilder, private profileService: AccountService,
    private router: Router) { }


  ngOnInit(): void {
    this.initializeForm();
    this.loadData();
  }

  loadData() {
    var user = JSON.parse(localStorage.getItem('user'));
    var model:any;
    console.log(user.username);
    this.profileService.getProfile(user.username).subscribe(
      res =>{
        model = res;
        this.editProfileForm.patchValue({
          username:model.retval.userName,
          email: model.retval.email,
          oldPassword:"",
          newPassword:"",
          firstName:model.retval.firstName,
          lastName:model.retval.lastName,
          dateOfBirth:model.retval.dateOfBirth,
          address:model.retval.address,
          userRole:model.retval.userRole,
        });
        this.updateProfile = model.retval;
      },
      err=>{
        console.log(err);
      }
    );
  }

  initializeForm() {
    this.editProfileForm = this.fb.group({
      username: [{value: '', disabled: true}, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      userRole: ['', Validators.required],
      oldPassword: ['', ],
      newPassword: ['',]
    })
  }

  receiveMap(map: Map) {
    this.map = map;
    this.map.setView(latLng(45.2329,19.7910), 12);

    this.map.on('click', <LeafletMouseEvent>(e) => { 
      this.editProfileForm.get('latitude').setValue(e.latlng.lat);
      this.editProfileForm.get('longitude').setValue(e.latlng.lng);
      
      this.http.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + e.latlng.lat + '&lon=' + e.latlng.lng).subscribe(response => {
        this.addrInfo = response["address"];
        this.editProfileForm.get('address').setValue(this.addrInfo["road"] + ' ' + this.addrInfo["house_number"]);
      })

    });
  }
  
  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

  
  saveChanges() {
    this.updateProfile.userName = this.editProfileForm.get('username').value;
    this.updateProfile.firstName = this.editProfileForm.get('firstName').value;
    this.updateProfile.lastName = this.editProfileForm.get('lastName').value;
    this.updateProfile.email = this.editProfileForm.get('email').value;
    this.updateProfile.userRole = this.editProfileForm.get('userRole').value;
    this.updateProfile.address = this.editProfileForm.get('address').value;
    this.updateProfile.dateOfBirth = this.editProfileForm.get('dateOfBirth').value;
    this.updateProfile.oldPassword = this.editProfileForm.get('oldPassword').value;
    this.updateProfile.newPassword = this.editProfileForm.get('newPassword').value;
      this.profileService.editProfile(this.updateProfile).subscribe(response =>{
        this.router.navigateByUrl('/dashboard');
        this.toastrService.success('Successfully changed profile details');
      },
      err=>{
        this.toastrService.error('Error while changing profile details');
      })
  }

}
