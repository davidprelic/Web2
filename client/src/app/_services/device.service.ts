import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from '../_models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient, private router: Router) { }

  addNewDevice(model: Device) {
    return this.http.post<Device>(this.baseUrl + 'device', model);
  }

  getDevices() {
    return this.http.get<Device[]>(this.baseUrl + 'device')
  }

  getFreeDevices() {
    return this.http.get<Device[]>(this.baseUrl + 'device/free')
  }

  getDevicesByIncidentId(id: number) {
    return this.http.get<Device[]>(this.baseUrl + 'device/incident/' + id)
  }

  getDevicesAfterSearch(model: Device) {
    let params = new HttpParams();
    params = params.append("type", model.type);
    params = params.append("name", model.name);
    params = params.append("address", model.address);
    params = params.append("latitude", model.latitude.toString());
    params = params.append("longitude", model.longitude.toString());

    this.router.navigate(['/devices'], { queryParams: { type: model.type, name: model.name, address: model.address, 
                                                        latitude: model.latitude, longitude: model.longitude } });

    return this.http.get<Device[]>(this.baseUrl + 'device/search', {params: params});
  }

  getDeviceById(id: number) {
    return this.http.get<Device>(this.baseUrl + 'device/' + id);
  }

  updateDevice(device: Device) {
    return this.http.put(this.baseUrl + 'device', device);
  }

  deleteDevice(id: number) {
    return this.http.delete(this.baseUrl + 'device/' + id);
  }

  private toQueryString(query): string {
    var parts = [];
    for (var property in query) {
      var value = query[property];
      if (value != null && value != undefined)
         parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value))
    }
    
    return parts.join('&');
 }

}
