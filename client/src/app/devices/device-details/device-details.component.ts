import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Map, latLng } from 'leaflet';
import { Device } from 'src/app/_models/device';
import { DeviceUpdate } from 'src/app/_models/device-update';
import { DeviceService } from 'src/app/_services/device.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {

  model: any = {};
  deviceForm: FormGroup;
  private map: Map;
  private zoom: number;
  deviceId: number;
  currentDevice: Device;
  updateDevice: DeviceUpdate;
  
  addrInfo = {};

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient,
     private deviceService: DeviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.deviceId = this.route.snapshot.params['id']
    this.deviceService.getDeviceById(this.deviceId).subscribe(response => {
      this.currentDevice = response;
      this.initializeForm();
    });

  }

  receiveMap(map: Map) {
    this.map = map;
    this.map.setView(latLng(45.2329,19.7910), 12);

    this.updateDevice = {
      id: this.deviceId,
      type: this.currentDevice.type,
      name: this.currentDevice.name,
      address: this.currentDevice.address,
      latitude: this.currentDevice.latitude.toString(),
      longitude: this.currentDevice.longitude.toString()
    };

    this.map.on('click', <LeafletMouseEvent>(e) => { 
      this.deviceForm.get('latitude').setValue(e.latlng.lat);
      this.deviceForm.get('longitude').setValue(e.latlng.lng);

      this.http.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + e.latlng.lat + '&lon=' + e.latlng.lng).subscribe(response => {
        this.addrInfo = response["address"];
        this.deviceForm.get('address').setValue(this.addrInfo["road"] + ' ' + this.addrInfo["house_number"]);
      })
    });
  }
  
  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

  initializeForm() {
    this.deviceForm = this.fb.group({
      type: [{value: this.currentDevice.type, disabled: true}, Validators.required],
      name: [{value: this.currentDevice.name, disabled: true}, Validators.required],
      address: [{value: this.currentDevice.address, disabled: true}, Validators.required],
      latitude: [{value: this.currentDevice.latitude, disabled: true}, Validators.required],
      longitude: [{value: this.currentDevice.longitude, disabled: true}, Validators.required]
    })
  }

  edit() {
    this.updateDevice.address = this.deviceForm.get('address').value;
    this.updateDevice.latitude = this.deviceForm.get('latitude').value;
    this.updateDevice.longitude = this.deviceForm.get('longitude').value;

    this.deviceService.updateDevice(this.updateDevice).subscribe(response => {
      this.router.navigateByUrl('/devices');
    });
  }

  delete() {
    this.deviceService.deleteDevice(this.deviceId).subscribe(response => {
      this.router.navigateByUrl('/devices');
    });
  }

  goBack() {
    this.router.navigateByUrl('/devices');
  }

}
