import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  hide = true;
  model: any = {};
  registerForm: FormGroup;

  constructor(private accountService: AccountService, private fb: FormBuilder, 
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      userRole: ['', Validators.required]
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null : {isMatching: true}
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/dashboard').finally(() => {
        window.location.reload();
      });
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  getErrorMessage(fControlName: string) {
    if (this.registerForm.get(fControlName).hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.registerForm.get(fControlName).hasError('email')) {
      return 'Not a valid email';
    }
    else if (this.registerForm.get(fControlName).hasError('isMatching')) {
      return 'Confirm password must match password';
    }
    else {
      return '';
    }
  }

}
