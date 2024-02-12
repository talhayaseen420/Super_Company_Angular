import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  isSubmitted: boolean = false

  signUpform!: FormGroup;

  constructor(
    private fb:FormBuilder, 
    private router:Router, 
    private toastr: ToastrService,
    private auth: AngularFireAuth) {
    this.signUpform = fb.group({
      email:['' , Validators.required],
      password: ['',Validators.required]
    })
  }

  onSubmit() {
    if (this.signUpform.valid) {
      this.auth.createUserWithEmailAndPassword(this.signUpform.value.email, this.signUpform.value.password)
      .then((response) => {
        if (response) {
          this.toastr.success('Registered', 'Successfull');
          this.router.navigate(['/login']);
        }
      })
      .catch((error) => {
        if (error) {
          this.toastr.error('Failed', error.message);
          this.router.navigate(['/register']);
        }
      });
    }
  }

}
