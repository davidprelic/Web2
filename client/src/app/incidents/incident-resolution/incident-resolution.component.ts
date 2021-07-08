import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Resolution } from 'src/app/_models/resolution';
import { IncidentService } from 'src/app/_services/incident.service';
import { ResolutionService } from 'src/app/_services/resolution.service';

@Component({
  selector: 'app-incident-resolution',
  templateUrl: './incident-resolution.component.html',
  styleUrls: ['./incident-resolution.component.css']
})
export class IncidentResolutionComponent implements OnInit {
  resolutionForm: FormGroup;
  incidentId: number;
  currentResolutionId: number;
  currentResolution: Resolution;
  resolutionForUpdate: Resolution;

  constructor(private fb: FormBuilder, private resolutionService: ResolutionService,
              private incidentService: IncidentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.incidentId = parseInt(this.route.snapshot.params['id']);

    if (this.incidentId != 0)
    {
      this.incidentService.getIncidentById(this.incidentId).subscribe(response => {
          this.currentResolutionId = response.resolutionId;
          this.resolutionService.getResolutionById(response.resolutionId).subscribe(response => {
            this.currentResolution = response;
            this.initializeForm();
          });
      });
    }
    else 
    {
      this.initializeForm();
    }
  }

  initializeForm() {
    this.resolutionForm = this.fb.group({
      cause: [ this.incidentId ? this.currentResolution.cause : null, Validators.required],
      subcause: [ this.incidentId ? this.currentResolution.subcause : null, Validators.required],
      constructionType: [ this.incidentId ? this.currentResolution.constructionType : null, Validators.required],
      material: [ this.incidentId ? this.currentResolution.material : null, Validators.required]
    })
  }

  updateResolution() {
    this.resolutionForUpdate = 
    {
      id: this.currentResolutionId,
      cause: this.resolutionForm.get('cause').value,
      subcause: this.resolutionForm.get('subcause').value,
      constructionType: this.resolutionForm.get('constructionType').value,
      material: this.resolutionForm.get('material').value
    }

    console.log(this.resolutionForUpdate);

    this.resolutionService.updateResolution(this.resolutionForUpdate).subscribe(response => {
      console.log('valid resolution update');
    });
  }

}
