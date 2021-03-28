import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-incident-resolution',
  templateUrl: './new-incident-resolution.component.html',
  styleUrls: ['./new-incident-resolution.component.css']
})
export class NewIncidentResolutionComponent implements OnInit {
  resolutionForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.resolutionForm = this.fb.group({
      cause: ['', Validators.required],
      subcause: ['', Validators.required],
      constructionType: ['', Validators.required],
      material: ['', Validators.required]
    })
  }

  register() {
    console.log(this.resolutionForm.value);
    // this.accountService.register(this.model);
  }

}
