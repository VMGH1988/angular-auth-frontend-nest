import { Component, OnInit } from '@angular/core';
import { ContactoService } from '../../services/contacto.service';
import { catchError, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styles: ``
})
export class ContactoComponent implements OnInit{
  contactoForm!: FormGroup;

  constructor(private fb: FormBuilder, private contactoService: ContactoService) {}

  ngOnInit(): void {
    this.contactoForm = this.fb.group({
      nombre: ['', Validators.required],
      asunto: ['', Validators.required],
      contenido: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactoForm.valid) {
      const { nombre, asunto, contenido } = this.contactoForm.value;
      this.contactoService.mailContacto(nombre, asunto, contenido)
      .pipe(
          catchError(err => {
            console.error(err);
            return throwError(() => err.error.message);
          })
        )
      .subscribe({
          next: () => console.log('Correo enviado exitosamente'),
          error: (message) => {
            console.error(message);
            // Manejo de errores
          }
        });
    }
  }
}
