import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'underscore';
import { SwaggerService } from './swagger.service';
import { CarShow } from './carShow.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  carShow: CarShow[];
  carsSub: Subscription;
  carGroups = []; // array of grouped objects as objects
  carGroupArray = [];  // array of grouped objects as array
  groupKeys = [];

  constructor(private swaggerService: SwaggerService) {}

  ngOnInit() {
     this.swaggerService.getCars();    // get cars from api
     this.carsSub = this.swaggerService.getCarsListener() // subscribe to listen to gotten cars
        .subscribe((c: CarShow[]) => {
          this.carShow = c;
          for ( let i = 0; i < this.carShow.length; i++) { // sort all car arrays in carShow
            this.carShow[i].cars.sort(function(a, b) {
                return (a.make < b.make) ? -1 : (a.make > b.make) ? 1 : 0;
            });
            this.carGroups[i] =  _.groupBy(this.carShow[i].cars, 'make');
            // console.log('Result :', this.carGroups[i]);
            for (const x of Object.values(this.carGroups[i])) {
              // console.log(x);
              this.carGroupArray[i] = x;
            }
            this.groupKeys[i] = new Array();
            for (const x of Object.keys(this.carGroups[i])) {
              // console.log(x);
              this.groupKeys[i].push(x);
            }
            console.log('groups :', i);
            console.log(this.groupKeys[i]);
          }
             // console.log('Group 0: ', this.carGroups[0]);
             // console.log('Group 1: ', this.carGroups[1]);

            // console.log('grouped: ', this.carGroups);

     });
   }
   ngOnDestroy() {
    this.carsSub.unsubscribe();
   }
}
