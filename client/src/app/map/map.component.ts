import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MapOptions, Map, tileLayer, latLng, ZoomAnimEvent } from 'leaflet';
import { MarkerService } from '../_services/marker.service';
import * as L from 'leaflet'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IncidentService } from 'src/app/_services/incident.service';
import { Incident } from 'src/app/_models/incident';
import { CrewService } from 'src/app/_services/crew.service';
import { Crew } from 'src/app/_models/crew';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

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

  addressa: string;
  ekipa: string;
  ekipaId: number;
  allIncidents: Incident[];
  allCrews: Crew[];
  incIds: number;

  constructor(private markerService: MarkerService, private incidentService: IncidentService,
    private crewService: CrewService, private router: Router, private zone: NgZone) {
    this.markerService.coordsChange.pipe(takeUntil(this.unsubscribe)).subscribe(coords => {

      this.map.flyTo(coords, this.map.getZoom());

      this.incIds = this.allIncidents.find(x => x.latitude == coords[0]).id;
      this.addressa = this.allIncidents.find(x => x.latitude == coords[0]).location;
      this.ekipaId = this.allIncidents.find(x => x.latitude == coords[0]).crewId;

      if (this.ekipaId != null && this.ekipaId != undefined) {
        this.ekipa = this.allCrews.find(x => x.id == this.ekipaId).name + " radi na incidentu";
      }
      else {
        this.ekipa = "Nema aktivnih ekipa"
      }

      var ekx = this.incIds;
      var ruter = this.router;
      var zons = zone;

      L.marker(coords, { icon }).on("click", function (event) {
        zons.run(() => {
          ruter.navigateByUrl('/dashboard/incidents/' + ekx);
        });
      }).bindTooltip(this.addressa + " <br> " + this.ekipa, {
        permanent: false,
        opacity: 1,
        direction: 'top',
      }).addTo(this.map);
    });

  }

  ngOnInit(): void {
    this.incidentService.getIncidents().subscribe(response => {
      this.allIncidents = response;
    });
    this.crewService.getCrews().subscribe(response => {
      this.allCrews = response;
    })
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
