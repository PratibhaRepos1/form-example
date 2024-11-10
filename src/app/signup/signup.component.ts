import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder){
    //create a form with validations
    // fullname: required

    this.form = new FormGroup ({
      fullName: new FormControl('', Validators.required),
      userName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      email:new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]),
      confirmPassword: new FormControl<string>('', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]),
          
      acceptTerms: new FormControl(false, Validators.requiredTrue)
    },
     { validators: this.passwordMatchValidator } );

  

  }

  // Custom validator to check if Password and Confirm Password match
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { 'mismatch': true }
      : null;
  }


  onSubmit(){
    console.log('button called');

    if(this.form.valid) {
      console.log('form submitted: ', this.form.value)
    } else {
      console.log('Form invalid');
    }
  }


}

