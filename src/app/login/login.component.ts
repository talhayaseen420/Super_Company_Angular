import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class LoginComponent {

  isSubmitted: boolean = false;

  loginform: FormGroup;
  constructor(
    private fb:FormBuilder, 
    private router:Router,
    private toastr: ToastrService, 
    private auth: AngularFireAuth
    ) {
    this.loginform = fb.group({
      username:['' , Validators.required],
      password: ['',Validators.required]
    })
  }

  onSubmit(){
    this.isSubmitted = true
    if (this.loginform.valid) {
      this.auth.signInWithEmailAndPassword(this.loginform.value.username, this.loginform.value.password)
      .then((response:any) => {
        if (response) {
          console.log(response.user['_delegate'].accessToken)
          const token = response.user['_delegate'].accessToken
          localStorage.setItem('access_token', token)
          localStorage.setItem('username', JSON.stringify(this.loginform.value.username));
          this.router.navigate(['/dashboard']);
          this.toastr.success('Login', 'Successfull!');
        }
      })
      .catch((error) => {
        if (error) {
          this.toastr.error('Failed', error.message);
          this.router.navigate(['/login']);
        }
      });
    }
  }

  ngOnInit(): void {
  }

}
