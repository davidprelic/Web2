import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-safety-doc-checklist',
  templateUrl: './safety-doc-checklist.component.html',
  styleUrls: ['./safety-doc-checklist.component.css']
})
export class SafetyDocChecklistComponent implements OnInit {
  checklistForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.checklistForm = this.fb.group({
      workOperationsCompleted: ['', Validators.required],
      tagsRemoved: ['', Validators.required],
      groundingRemoved: ['', Validators.required],
      readyForService: ['', Validators.required],
    })
  }

  saveBasicInfo() {
    console.log(this.checklistForm);
  }

}
