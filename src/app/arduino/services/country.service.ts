import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

interface Country {
  name: string;
  series: Series[];
}
interface Series {
  name: string;
  value: number;
}


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private data: Country[] = [
    {
      "name": "Tempe",
      "series": [{
        "name": "1990",
        "value": Math.random() * 60
      }]
    }
  ];
  constructor() {
    interval(2000).subscribe(() => this.randomData()); // Llama a randomData cada 2 segundos
  }

  get countryData() {
    return this.data;
  }

  randomData() {
    this.data = [
    {
      "name": "Tempe",
      "series": [
        {
          "name": "1990",
          "value": Math.random() * 60
        },
        {
          "name": "2010",
          "value": Math.random() * 60
        },
        {
          "name": "2012",
          "value": Math.random() * 60
        },
        {
          "name": "2013",
          "value": Math.random() * 60
        },
        {
          "name": "2014",
          "value": Math.random() * 60
        },
        {
          "name": "2015",
          "value": Math.random() * 60
        },
        {
          "name": "2016",
          "value": Math.random() * 60
        },
        {
          "name": "2017",
          "value": Math.random() * 60
        },
        {
          "name": "2018",
          "value": Math.random() * 60
        }
      ]
    }

  ];
  }




}
