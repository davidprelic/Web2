import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../_models/customer';
import { CustomerItem } from '../_models/customer-item';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService{
    private baseUrl = "https://localhost:5001/api/Consumer/"

    constructor(private http: HttpClient, private router: Router){

    }

    getConsumers(){
        return this.http.get<CustomerItem[]>(this.baseUrl);
    }

    addConsumer(model: Customer){
        return this.http.post<Customer>(this.baseUrl, model);
    }

    getConsumersAfterSearch(model: Customer){
        let params = new HttpParams();
        params = params.append("name", model.name);
        params = params.append("lastName", model.lastName);
        params = params.append("type", model.type);
        params = params.append("location", model.location);
        params = params.append("priority", model.priority);
        params = params.append("phoneNumber", model.phoneNumber.toString());
        params = params.append("latitude", model.latitude.toString());
        params = params.append("longitude", model.longitude.toString());

        this.router.navigate(['/consumer'], {queryParams: {name: model.name, lastname: model.lastName, type: model.type, location: model.location,
                                                            priority: model.priority, phoneNumber: model.phoneNumber, latitude: model.latitude, longitude: model.longitude}})

        return this.http.get<CustomerItem[]>(this.baseUrl + 'search', {params: params});
    }

    getConsumerById(id: number) {
        return this.http.get<Customer>(this.baseUrl  + id);
      }

    updateConsumer(customer: Customer){
        return this.http.put(this.baseUrl, customer);
    }

    deleteConsumer(id: number) {
        return this.http.delete(this.baseUrl + id);
      }
}