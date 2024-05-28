import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {
  private municipioData = new BehaviorSubject<any>(null);

  setData(data: any) {
    this.municipioData.next(data);
  }

  getData() {
    return this.municipioData.asObservable();
  }
}
