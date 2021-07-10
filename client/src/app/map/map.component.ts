import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MapOptions, Map, tileLayer, latLng, ZoomAnimEvent } from 'leaflet';
import { MarkerService } from '../_services/marker.service';
import * as L from 'leaflet'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Input() options: MapOptions = {
    layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.7,
      maxZoom: 19,
      minZoom: 2,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })],
    zoom: 12,
    center: latLng(45.2329, 19.7910),
  };
  public map: Map;
  public zoom: number;
  private unsubscribe = new Subject<void>();

  latitude: number;
  longitude: number;
  markerTooltipText: string;

  constructor(private markerService: MarkerService) {
    this.markerService.coordsChange.pipe(takeUntil(this.unsubscribe)).subscribe(coords => {
          this.map.flyTo(coords, this.map.getZoom());
          L.marker(coords, { icon }).addTo(this.map).on("mouseover", function (event) {
            this.latitude = event["latlng"].lat;
            this.longitude = event["latlng"].lng;

            console.log(this.latitude);
            
        }).bindTooltip(this.latitude + ', ' + this.longitude, {
          permanent: false,
          opacity: 1,
          direction: 'top'
        });
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.map.clearAllEventListeners;
    //this.map.remove();
  };

  onMapReady(map: Map) {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);
  }

  onMapZoomEnd(e: ZoomAnimEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }

}
