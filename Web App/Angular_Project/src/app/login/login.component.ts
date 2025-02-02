import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';
import { ToastService } from '../service/Toast-service';
import { TokenStorageService } from '../service/token-storage.service';
import { AuthenticationService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,  // Marking this as a standalone component
  imports: [ReactiveFormsModule, CommonModule, RouterModule],  // Importing necessary modules here
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = false;
  constructor( private router: Router,
    private apiService: ApiService,
    private authenticationService:AuthenticationService,
    public toastService: ToastService,
    public tokenService: TokenStorageService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  onLogin() {
   

  this.loginForm.markAllAsTouched();
  if (this.loginForm.invalid) {
    this.toastService.show('Please Fill All Mandatory Fields', {
      classname: 'bg-warning text-center text-white',
      delay: 2000,
    });
    return;
  }
  if (this.loginForm.valid) {
    let apiParams = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authenticationService.login(apiParams.email,apiParams.password).subscribe((res) => {
      if(res){
      this.tokenService.saveToken(res.token);     
      this.router.navigate(['/contacts']);
      this.toastService.show("Login Successfully !!", { 
        classname: 'bg-success text-center text-white', 
        delay: 2000 
      }); 
      }
    }, err => {
      console.log(err);
      this.toastService.show('Invalid Email or Password', {
        classname: 'bg-warning text-center text-white',
        delay: 2000,
      });    },
  );
  }
}
}
