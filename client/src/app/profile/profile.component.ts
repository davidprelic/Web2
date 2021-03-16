import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editProfileForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.editProfileForm = this.fb.group({
      username: ['Petar', Validators.required],
      email: ['peraperic@gmail.com', [Validators.required, Validators.email]],
      firstName: ['Petar', Validators.required],
      lastName: ['Peric', Validators.required],
      dateOfBirth: ['2000-01-20', Validators.required],
      address: ['Narodnog fronta', Validators.required],
      userRole: ['teamMember', Validators.required]
    })
  }

}
