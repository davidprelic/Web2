import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { MapOptions, Map, tileLayer, latLng, ZoomAnimEvent, LeafletMouseEvent } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { DeviceService } from 'src/app/_services/device.service';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {
  model: any = {};
  newDeviceForm: FormGroup;
  private map: Map;
  private zoom: number;

  addrInfo = {};

  constructor(private accountService: AccountService, private fb: FormBuilder, 
    private router: Router, private http: HttpClient, private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  receiveMap(map: Map) {
    this.map = map;
    this.map.setView(latLng(45.2329,19.7910), 12);

    this.map.on('click', <LeafletMouseEvent>(e) => { 
      this.newDeviceForm.get('latitude').setValue(e.latlng.lat);
      this.newDeviceForm.get('longitude').setValue(e.latlng.lng);
      
      this.http.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + e.latlng.lat + '&lon=' + e.latlng.lng).subscribe(response => {
        this.addrInfo = response["address"];
        this.newDeviceForm.get('address').setValue(this.addrInfo["road"] + ' ' + this.addrInfo["house_number"]);
      })

    });
  }
  
  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

  initializeForm() {
    this.newDeviceForm = this.fb.group({
      type: ['', Validators.required],
      name: [{value: 'Server defined', disabled: true}, Validators.required],
      address: [{value: 'Choose on map', disabled: true}, Validators.required],
      latitude: [{value: 'Choose on map', disabled: true}, Validators.required],
      longitude: [{value: 'Choose on map', disabled: true}, Validators.required]
    })
  }

  add() {
    this.deviceService.addNewDevice(this.newDeviceForm.getRawValue()).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/devices');
    });
  }

  cancel() {
    this.router.navigateByUrl('/devices');
  }

}
