import { Component, OnInit } from '@angular/core';
import { Incident } from '../_models/incident';
import { SafetyDocument } from '../_models/safety-document';
import { WorkPlan } from '../_models/work-plan';
import { WorkRequest } from '../_models/work-request';
import { IncidentService } from '../_services/incident.service';
import { SafetyDocService } from '../_services/safety-doc.service';
import { WorkPlanService } from '../_services/work-plan.service';
import { WorkRequestService } from '../_services/work-request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  incidents: Incident[];
  safetyDocs: SafetyDocument[];
  workPlans: WorkPlan[];
  workRequests: WorkRequest[];

  numOfDraftsIncident: number;
  numOfApprovedIncident: number;
  numOfDeniedIncident: number;
  numOfCompletedIncident: number;

  numOfDraftsSafetyDoc: number;
  numOfApprovedSafetyDoc: number;
  numOfIssuedSafetyDoc: number;
  numOfDeniedSafetyDoc: number;

  numOfDraftsWorkRequest: number;
  numOfApprovedWorkRequest: number;
  numOfIssuedWorkRequest: number;
  numOfDeniedWorkRequest: number;

  numOfDraftsWorkPlan: number;
  numOfApprovedWorkPlan: number;
  numOfIssuedWorkPlan: number;
  numOfDeniedWorkPlan: number;
  

  constructor(private incidentService: IncidentService, private safetyDocService: SafetyDocService,
    private workRequestService: WorkRequestService, private workPlanService: WorkPlanService) { }

  ngOnInit(): void {
    this.incidentService.getIncidents().subscribe(response => {
      this.incidents = response;

      this.numOfDraftsIncident = 0;
      this.numOfApprovedIncident = 0;
      this.numOfDeniedIncident = 0;
      this.numOfCompletedIncident = 0;

      this.incidents.forEach(element => {
        if (element.status === "Draft")
          this.numOfDraftsIncident += 1;
        if (element.status === "Approved")
          this.numOfApprovedIncident += 1;
        if (element.status === "Denied")
          this.numOfDeniedIncident += 1;
        if (element.status === "Completed")
          this.numOfCompletedIncident += 1;
      });

    });

    this.safetyDocService.getSafetyDocs().subscribe(response => {
      this.safetyDocs = response;

      this.numOfDraftsSafetyDoc = 0;
      this.numOfApprovedSafetyDoc = 0;
      this.numOfIssuedSafetyDoc = 0;
      this.numOfDeniedSafetyDoc = 0;

      this.safetyDocs.forEach(element => {
        if (element.status === "Draft")
          this.numOfDraftsSafetyDoc += 1;
        if (element.status === "Approved")
          this.numOfApprovedSafetyDoc += 1;
        if (element.status === "Issued")
          this.numOfIssuedSafetyDoc += 1;
        if (element.status === "Denied")
          this.numOfDeniedSafetyDoc += 1;
      });

    });

    this.workPlanService.getWorkPlans().subscribe(response => {
      this.workPlans = response;

      this.numOfDraftsWorkPlan = 0;
      this.numOfApprovedWorkPlan = 0;
      this.numOfIssuedWorkPlan = 0;
      this.numOfDeniedWorkPlan = 0;

      this.workPlans.forEach(element => {
        if (element.status === "Draft")
          this.numOfDraftsWorkPlan += 1;
        if (element.status === "Approved")
          this.numOfApprovedWorkPlan += 1;
        if (element.status === "Issued")
          this.numOfIssuedWorkPlan += 1;
        if (element.status === "Denied")
          this.numOfDeniedWorkPlan += 1;
      });

    });

    this.workRequestService.getWorkRequests().subscribe(response => {
      this.workRequests = response;

      this.numOfDraftsWorkRequest = 0;
      this.numOfApprovedWorkRequest = 0;
      this.numOfIssuedWorkRequest = 0;
      this.numOfDeniedWorkRequest = 0;

      this.workRequests.forEach(element => {
        if (element.status === "Draft")
          this.numOfDraftsWorkRequest += 1;
        if (element.status === "Approved")
          this.numOfApprovedWorkRequest += 1;
        if (element.status === "Issued")
          this.numOfIssuedWorkRequest += 1;
        if (element.status === "Denied")
          this.numOfDeniedWorkRequest += 1;
      });

    });


  }

}
