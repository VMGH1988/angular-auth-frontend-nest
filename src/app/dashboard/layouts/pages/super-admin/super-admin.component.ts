import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Users } from '../../../interfaces/users.interface';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
})
export class SuperAdminComponent implements OnInit {

  users: Users[] = [];
  selectedUserId: string | null = null;
  public userForm!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.findAll();
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: [''],
      isActive: []
    });
  }

  findAll() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en localStorage.');
      return;
    }
    this.authService.findAll(token)
     .subscribe((response: Users[]) => {
        this.users = response;
      }, error => {
        console.error(error);
      });
  }

  setEditUserForm(userId: string) {
    this.selectedUserId = userId;
    console.log(userId)
    this.authService.getUserById(userId).subscribe(user => {
      console.log(user)
      if (user) {

        this.userForm.patchValue({
          name: user.name,
          email: user.email,
          password: '000000',
          roles: user.roles,
          isActive: user.isActive
        });
      console.log(this.userForm.value);
      } else {
        console.error('Usuario no encontrado');
      }
    });
  }
  updateAdmin(id: string) {
    const { name, email, password, roles, isActive } = this.userForm.value;

    // Convierto en boolean porque aun iniciandolo en boolean en el formulario el select lo devuelve en string siempre y daria error
    const isActiveBoolean = isActive === 'true'? true : false;

    console.log(this.userForm.value);
    this.authService.updateAdmin(id, name, email, password, roles, isActiveBoolean)
     .subscribe({
          error: (message) => {
            Swal.fire('Error');
          },
          next: () => {
            this.findAll();
          }
        });
  }

  onDeleteUser(userId: string) {
    this.authService.delete(userId)
     .subscribe({
        next: () => {
          this.findAll();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

}
