import { Component } from "@angular/core";
import { MarkerService } from "../_services/marker.service";
import { IncidentService } from 'src/app/_services/incident.service';
import { Incident } from 'src/app/_models/incident';

@Component({
    selector: "another-root",
    templateUrl: "./another.component.html",
    styleUrls: ["./map.component.css"]
})
export class AnotherComponent {
    allIncidents: Incident[];
    
    constructor(private ms: MarkerService, private incidentService: IncidentService) { }

    ngOnInit(): void {
        this.incidentService.getIncidents().subscribe(response => {
            this.allIncidents = response;
            this.allIncidents.forEach(element => {
                if (element.location != null && element.longitude != null && element.latitude != undefined && element.longitude != undefined) {
                    this.ms.change([element.latitude, element.longitude])
                }
            }
            );
        });
    }
}