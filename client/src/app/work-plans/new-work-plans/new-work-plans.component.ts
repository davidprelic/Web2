import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-work-plans',
  templateUrl: './new-work-plans.component.html',
  styleUrls: ['./new-work-plans.component.css']
})
export class NewWorkPlansComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  workPlanId: number;

  ngOnInit(): void {
    this.workPlanId = parseInt(this.route.snapshot.params['id']);
  }

}
