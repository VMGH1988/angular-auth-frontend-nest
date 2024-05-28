import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';


@Component({
  selector: 'app-arduino',
  templateUrl: './arduino.component.html',
  styles: ``
})
export class ArduinoComponent {

  view: [number, number] = [700, 300];

 // options
 legend: boolean = true;
 showLabels: boolean = true;
 animations: boolean = true;
 xAxis: boolean = true;
 yAxis: boolean = true;
 showYAxisLabel: boolean = true;
 showXAxisLabel: boolean = true;
 xAxisLabel: string = 'Tiempo';
 yAxisLabel: string = 'Grados Centigrados';
 timeline: boolean = true;
 yAxisLabel2: string = 'Humedad';

 colorScheme = {
  domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
};
  constructor( private countryService: CountryService ) {}

  get single() {
    return this.countryService.countryData;
  }

  onRandomData() {
    this.countryService.randomData();
  }

  onSelect(data: any): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
   // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
   // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
