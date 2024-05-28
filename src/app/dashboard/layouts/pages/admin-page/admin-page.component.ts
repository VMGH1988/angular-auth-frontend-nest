import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import Swal from 'sweetalert2'


@Component({
  templateUrl: './admin-page.component.html',
  styles: ``
})
export class AdminPageComponent {


    private fb          = inject( FormBuilder );
    private authService = inject( AuthService );
    private router      = inject( Router )

  public user = computed(() => this.authService.currentUser() );

  public myForm2: FormGroup = this.fb.group({
    name: [this.user()?.name,[ Validators.required, Validators.minLength(6) ]],
    email:    [this.user()?.email, [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],

  });



update(id: string){
  const {name, email, password} = this.myForm2.value;


  this.authService.update(id, name, email, password)
  .subscribe({
    next: () => this.router.navigateByUrl('/user'),
    error: (message) => {
      Swal.fire('Error', message, 'error' )
    }
  })

}




delete(id: string) {

  Swal.fire({
    title: '¿Estás seguro?',
    text: "Una vez eliminado, no podrás recuperarlo",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, bórralo!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.authService.delete(id)
   .subscribe({
      next: () => this.router.navigateByUrl('auth/login'),

    })
    this.onLogout()

    }
  });

}

onLogout() {
  this.authService.logout();
}
}
