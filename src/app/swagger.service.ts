import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Car } from './car.model';
import { CarShow } from './carShow.model';

import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class SwaggerService {
  private receievedCars: CarShow[] = [];
  private carsSubject = new Subject<CarShow[]>();

  constructor(private http: HttpClient) {}

  getCars() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.get< [{name: string, cars: Car[]}] >
    ('http://eacodingtest.digital.energyaustralia.com.au/api/v1/cars', { headers: headers }).pipe(
      map(values => {
        return values;
      })
    ).subscribe( c => {
      this.receievedCars = c;
      this.carsSubject.next([...this.receievedCars]);
      console.log(c);
    });
  }
  getCarsListener() {
    return this.carsSubject.asObservable();
  }
}
