import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Checklist } from 'src/app/_models/checklist';
import { ChecklistService } from 'src/app/_services/checklist.service';
import { SafetyDocService } from 'src/app/_services/safety-doc.service';

@Component({
  selector: 'app-safety-doc-checklist',
  templateUrl: './safety-doc-checklist.component.html',
  styleUrls: ['./safety-doc-checklist.component.css']
})
export class SafetyDocChecklistComponent implements OnInit {
  checklistForm: FormGroup;
  safetyDocId: number;
  currentChecklistId: number;
  currentChecklist: Checklist;
  checklistForUpdate: Checklist;
  userRole: string;

  constructor(private fb: FormBuilder, private checklistService: ChecklistService, private router: Router,
              private safetyDocService: SafetyDocService, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('user'));
    this.userRole = user.userRole;

    this.safetyDocId = parseInt(this.route.snapshot.params['id']);

    if (this.safetyDocId != 0)
    {
      this.safetyDocService.getSafetyDocById(this.safetyDocId).subscribe(response => {
          this.currentChecklistId = response.checklistId;
          this.checklistService.getChecklistById(response.checklistId).subscribe(response => {
            this.currentChecklist = response;
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
    this.checklistForm = this.fb.group({
      workOperationsCompleted: [ {value: this.safetyDocId ? this.currentChecklist.workOperationsCompleted : null, disabled: (this.userRole != "Dispatcher") ? true : false}],
      tagsRemoved: [ {value: this.safetyDocId ? this.currentChecklist.tagsRemoved : null, disabled: (this.userRole != "Dispatcher") ? true : false}],
      groundingRemoved: [ {value: this.safetyDocId ? this.currentChecklist.groundingRemoved : null, disabled: (this.userRole != "Dispatcher") ? true : false}],
      readyForService: [ {value: this.safetyDocId ? this.currentChecklist.readyForService : null, disabled: (this.userRole != "Dispatcher") ? true : false}],
    })
  }

  cancel(){
    this.router.navigateByUrl('/dashboard/safety-docs');
  }

  updateChecklist() {
    this.checklistForUpdate = 
    {
      id: this.currentChecklistId,
      workOperationsCompleted: this.checklistForm.get('workOperationsCompleted').value,
      tagsRemoved: this.checklistForm.get('tagsRemoved').value,
      groundingRemoved: this.checklistForm.get('groundingRemoved').value,
      readyForService: this.checklistForm.get('readyForService').value
    }

    console.log(this.checklistForUpdate);

    this.checklistService.updateChecklist(this.checklistForUpdate).subscribe(response => {
      this._snackBar.open("Cheklist updated!", "Succes", {
        duration: 2000,
        horizontalPosition: 'end',
        panelClass: ['mat-toolbar', 'mat-accent']
      }); 
    });
  }

}
