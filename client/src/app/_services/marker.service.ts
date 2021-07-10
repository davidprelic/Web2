import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LatLngExpression } from "leaflet";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MarkerService {

    coords: any;
    coordsChange: Subject<LatLngExpression> = new Subject<LatLngExpression>();

    constructor() {
        this.coords = [];
    }

    change(coords: Array<number>) {
        this.coords = coords;
        this.coordsChange.next(this.coords);
    }
}