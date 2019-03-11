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
  private errorSubject = new Subject<any>();

  cars: CarShow[];

  constructor(private http: HttpClient) {}

  getCars() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.cars = new Array();
    this.http.get< [{name: string, cars: Car[]}] >
    ('http://eacodingtest.digital.energyaustralia.com.au/api/v1/cars', { headers: headers })
    .pipe(
      map(values => {
        this.cars  = values;
        return this.cars;
      })
    ).subscribe( c => {
      this.receievedCars = c;
      this.carsSubject.next([...this.receievedCars]);
      // console.log(c);
    }, error => {
        console.log(error);
        this.errorSubject.next(error);
    });
  }
  getCarsListener() {
    return this.carsSubject.asObservable();
  }
  getErrorListener() {
    return this.errorSubject.asObservable();
  }
}
