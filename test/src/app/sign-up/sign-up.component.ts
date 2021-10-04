import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ServiceService} from "../service.service";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  loginForm: FormGroup;
  msg = ' ';


  constructor(private routers: Router, private signService: ServiceService) {
    this.loginForm = new FormGroup({
        firstname: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern("[a-zA-Z][a-zA-Z ]+"),
        ])),
        lastname: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern("[a-zA-Z][a-zA-Z ]+")
        ])),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.email
        ])),
        number: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(13),
          Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
        ])),

        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,}$"),


        ])),
        confirmpassword: new FormControl('', [Validators.required]),


      }, {

        validators: this.controlValuesAreEqual('password', 'confirmpassword')
      }
    );
  }


  ngOnInit(): void {
  }


  onSubmit() {
    console.log(this.loginForm.value);

    const signindata = {
      firstname: this.loginForm.value.firstname,
      lastname: this.loginForm.value.lastname,
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      confirmpassword: this.loginForm.value.confirmpassword,
      number: this.loginForm.value.number,
    };
    this.signService.signup(signindata).subscribe(data => {
        console.log('Successfully create Your Account', data);
        this.routers.navigate(['/result']);
      }, error => {
        this.msg = 'Your Email Id already exist';
      }
    );


    console.log('This is the form all value ', signindata);
    this.loginForm.reset();
  }

  private controlValuesAreEqual(controlNameA: string, controlNameB: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const valueOfControlA = formGroup.get(controlNameA)?.value;
      const valueOfControlB = formGroup.get(controlNameB)?.value;

      if (valueOfControlA === valueOfControlB) {
        return null
      } else {
        return {valuesDoNotMatch: true}
      }


    }
  }

}

