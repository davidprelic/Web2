import { Component, OnInit } from '@angular/core';
import { MapOptions, Map, tileLayer, latLng, ZoomAnimEvent } from 'leaflet';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  private map: Map;
  private zoom: number;
  
  receiveMap(map: Map) {
    this.map = map;
  }

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
