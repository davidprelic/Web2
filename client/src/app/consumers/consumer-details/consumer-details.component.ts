import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Map, latLng } from 'leaflet';
import { ConsumerService } from 'src/app/_services/consumer.service';
import { Customer } from 'src/app/_models/customer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consumer-details',
  templateUrl: './consumer-details.component.html',
  styleUrls: ['./consumer-details.component.css']
})
export class ConsumerDetailsComponent implements OnInit {
  model: any = {};
  consumerForm: FormGroup;
  private map: Map;
  private zoom: number;
  consumerId: number;
  currentConsumer: Customer;
  updateConsumer: Customer;

  addrInfo = {};

  constructor(private toastrService: ToastrService, private fb: FormBuilder, private router: Router, private http: HttpClient,
    private consumerService: ConsumerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.consumerId = this.route.snapshot.params['id'];
    this.consumerService.getConsumerById(this.consumerId).subscribe(response =>{
      this.currentConsumer = response;
      this.updateConsumer = response;
      this.initializeForm();
    })
  }

  receiveMap(map: Map) {
    this.map = map;
    this.map.setView(latLng(45.2329,19.7910), 12);

    this.map.on('click', <LeafletMouseEvent>(e) => { 
      this.consumerForm.get('latitude').setValue(e.latlng.lat);
      this.consumerForm.get('longitude').setValue(e.latlng.lng);
      
      this.http.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + e.latlng.lat + '&lon=' + e.latlng.lng).subscribe(response => {
        this.addrInfo = response["address"];
        this.consumerForm.get('location').setValue(this.addrInfo["road"] + ' ' + this.addrInfo["house_number"]);
      })

    });
  }
  
  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

  initializeForm() {
    this.consumerForm = this.fb.group({
      name: [this.currentConsumer.name, Validators.required],
      lastName: [this.currentConsumer.lastName, Validators.required],
      location: [{value: this.currentConsumer.location, disabled: true}, Validators.required],
      priority: [this.currentConsumer.priority.toString(), Validators.required],
      phoneNumber: [this.currentConsumer.phoneNumber, Validators.required],
      type: [this.currentConsumer.type, Validators.required],
      latitude: [{value: this.currentConsumer.latitude, disabled: true}, Validators.required],
      longitude: [{value: this.currentConsumer.longitude, disabled: true}, Validators.required],
    })
  }

  edit(){
    this.updateConsumer.location = this.consumerForm.get('location').value;
    this.updateConsumer.latitude = this.consumerForm.get('latitude').value;
    this.updateConsumer.longitude = this.consumerForm.get('longitude').value;
    this.updateConsumer.name = this.consumerForm.get('name').value;
    this.updateConsumer.lastName = this.consumerForm.get('lastName').value;
    this.updateConsumer.phoneNumber = this.consumerForm.get('phoneNumber').value;
    this.updateConsumer.type = this.consumerForm.get('type').value;
    this.updateConsumer.priority = this.consumerForm.get('priority').value;

    this.consumerService.updateConsumer(this.updateConsumer).subscribe(response => {
      this.router.navigateByUrl('/consumers');
      this.toastrService.success('Successfully updated consumer')
    });
  }

  delete(){
    this.consumerService.deleteConsumer(this.consumerId).subscribe(response => {
      this.router.navigateByUrl('/consumers');
      this.toastrService.success('Successfully deleted consumer')
    });
  }

  goBack(){
    this.router.navigateByUrl('/consumers');
  }

}
