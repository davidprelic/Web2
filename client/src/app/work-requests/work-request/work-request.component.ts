import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-request',
  templateUrl: './work-request.component.html',
  styleUrls: ['./work-request.component.css']
})
export class WorkRequestComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  workRequestId: number;

  ngOnInit(): void {
    this.workRequestId = parseInt(this.route.snapshot.params['id']);
  }

}
