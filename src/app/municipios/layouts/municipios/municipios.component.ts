import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MunicipiosService } from '../../../shared/municipios.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',


})
export class MunicipiosComponent implements OnInit {
  comunidades: any[] = [];
  provincias: any[] = [];
  municipios: any[] = [];
  selectedComunidad: string = '0';
  selectedProvincia: string = '0';
  selectedMunicipio: string = '0';

  constructor(private http: HttpClient, private municipiosService: MunicipiosService) {}

  ngOnInit(): void {
    this.cargarAutonomias();
  }

  cargarAutonomias() {
    this.http.get<any[]>('../../../../assets/autonomias/autonomias.json').subscribe(data => {
      this.comunidades = data;
    });
  }

  cargarProvincias(idComunidad: string) {
    this.http.get<any[]>('../../../../assets/autonomias/provincias.json').subscribe(data => {
      this.provincias = data.filter(value => value.aut === idComunidad);
    });
  }

  cargarMunicipios(idProvincia: string) {
    this.http.get<any[]>('../../../../assets/autonomias/municipios.json').subscribe(data => {
      this.municipios = data.filter(value => value.provincia_id === idProvincia);
    });
  }

  onComunidadesChange(value: string) {
    if (value === "0") {
      this.provincias = [];
    } else {
      this.cargarProvincias(value);
    }
  }

  onProvinciasChange(value: string) {
    if (value === "0") {
      this.municipios = [];
    } else {
      this.cargarMunicipios(value);
    }
  }

onMunicipiosChange(value: string) {
  if (value === "0") {
    this.selectedMunicipio = '0';
  } else {
    this.selectedMunicipio = value; // Asigna directamente el municipio_id seleccionado
    console.log('selectedMunicipio:', this.selectedMunicipio); // Depuración
  }
}

onSubmit() {
  console.log('Formulario enviado');

  if (this.selectedMunicipio!== '0') {
    const municipioSeleccionado = this.municipios.find(municipio => municipio.municipio_id === this.selectedMunicipio);
    if (municipioSeleccionado) {
      const municipioIdDc = `${municipioSeleccionado.municipio_id}`;
      const nombre = municipioSeleccionado.nombre;
      console.log(nombre);
      console.log(municipioIdDc);
      const data ={municipioIdDc, nombre};
      this.municipiosService.setData(data);
    } else {
      console.log('No se pudo encontrar el municipio seleccionado.');
    }
  } else {

    Swal.fire({
      icon: 'error',
      title: 'Por favor seleccione un municipio',
      text: 'Es necesario seleccionar un municipio antes de enviar el formulario.',
    });
  }
}



}
