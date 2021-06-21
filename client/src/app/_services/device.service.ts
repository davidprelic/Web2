import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '../_models/device';
import { DeviceItem } from '../_models/device-item';
import { DeviceUpdate } from '../_models/device-update';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  addNewDevice(model: Device) {
    return this.http.post<Device>(this.baseUrl + 'device', model);
  }

  getDevices() {
    return this.http.get<DeviceItem[]>(this.baseUrl + 'device')
  }

  getDeviceById(id: number) {
    return this.http.get<Device>(this.baseUrl + 'device/' + id);
  }

  updateDevice(device: DeviceUpdate) {
    return this.http.put(this.baseUrl + 'device', device);
  }

  deleteDevice(id: number) {
    return this.http.delete(this.baseUrl + 'device/' + id);
  }

}
