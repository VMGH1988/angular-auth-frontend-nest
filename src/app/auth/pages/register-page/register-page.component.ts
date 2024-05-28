import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    name: ['',[ Validators.required, Validators.minLength(6) ]],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });

  register() {
    const {name, email, password} = this.myForm.value;

    this.authService.register(name, email, password)
     .pipe(
        switchMap(() => {

          return this.authService.mail(name, email);
        }),
        catchError((message) => {
          Swal.fire('Error', message, 'error');
          throw message;
        })
      )
     .subscribe({
        next: () => this.router.navigateByUrl('/user'),
        error: (message) => {
          Swal.fire('Error', message, 'error');
        }
      });
  }
}
