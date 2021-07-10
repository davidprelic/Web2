import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { HttpClient } from '@angular/common/http';
import { MapOptions, Map, tileLayer, latLng, ZoomAnimEvent, LeafletMouseEvent } from 'leaflet';
import { ConsumerService } from 'src/app/_services/consumer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-consumer',
  templateUrl: './new-consumer.component.html',
  styleUrls: ['./new-consumer.component.css']
})
export class NewConsumerComponent implements OnInit {
  model: any = {};
  newConsumerForm: FormGroup;
  private map: Map;
  private zoom: number;

  addrInfo = {};

  constructor(private toastrService: ToastrService, private accountService: AccountService, private fb: FormBuilder, 
    private router: Router, private http: HttpClient, private consumerService: ConsumerService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  receiveMap(map: Map) {
    this.map = map;
    this.map.setView(latLng(45.2329,19.7910), 12);

    this.map.on('click', <LeafletMouseEvent>(e) => { 
      this.newConsumerForm.get('latitude').setValue(e.latlng.lat);
      this.newConsumerForm.get('longitude').setValue(e.latlng.lng);
      
      this.http.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + e.latlng.lat + '&lon=' + e.latlng.lng).subscribe(response => {
        this.addrInfo = response["address"];
        this.newConsumerForm.get('location').setValue(this.addrInfo["road"] + ' ' + this.addrInfo["house_number"]);
      })

    });
  }
  
  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

  initializeForm() {
    this.newConsumerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      location: [{value: 'Choose on map', disabled: true}, Validators.required],
      priority: ['1', Validators.required],
      phoneNumber: ['', Validators.required],
      type: ['', Validators.required],
      latitude: [{value: 'Choose on map', disabled: true}, Validators.required],
      longitude: [{value: 'Choose on map', disabled: true}, Validators.required],
    })
  }

  add() {
    this.consumerService.addConsumer(this.newConsumerForm.getRawValue()).subscribe(response => {
      this.router.navigateByUrl('/consumers');
      this.toastrService.success('Successfully added consumer')
    }) 
  }

  cancel() {
    this.router.navigateByUrl('/consumers');
  }

}
