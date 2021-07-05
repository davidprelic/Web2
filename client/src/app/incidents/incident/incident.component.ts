import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  incidentId: number;

  ngOnInit(): void {
    this.incidentId = parseInt(this.route.snapshot.params['id']);
  }

}
