import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'underscore';
import { SwaggerService } from '../swagger.service';
import { CarShow } from '../carShow.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit, OnDestroy {
  carShow: CarShow[];
  carsSub: Subscription;
  errorSub: Subscription;
  carGroups = []; // array of grouped objects as objects
  carGroupArray = [];  // array of grouped objects as array
  groupKeys = [];
  errorMessage = '';
  status = 0;
  constructor(private swaggerService: SwaggerService) { }
  ngOnInit() {
     this.onConnect();
  }
  onConnect() {
    this.swaggerService.getCars();    // get cars from api
    this.carsSub = this.swaggerService.getCarsListener() // subscribe to listen to gotten cars
       .subscribe((c: CarShow[]) => {
         this. status = 1;
         this.carShow = c;
         for ( let i = 0; i < this.carShow.length; i++) { // sort carshow alphabetically
           this.carShow[i].cars.sort(function(a, b) {
               return (a.make < b.make) ? -1 : (a.make > b.make) ? 1 : 0;
           });
           this.carGroups[i] =  _.groupBy(this.carShow[i].cars, 'make'); // groupby using _
           for (const x of Object.values(this.carGroups[i])) {
             this.carGroupArray[i] = x;
           }
           this.groupKeys[i] = new Array();  // get {} keys to be able to output to HTML
           for (const x of Object.keys(this.carGroups[i])) {
             this.groupKeys[i].push(x);
           }
         }
    });
    this.errorSub = this.swaggerService.getErrorListener() // subscribe to listen to error messages
       .subscribe(error => {
           this.errorMessage = error;
           console.log(this.errorMessage);
           this. status = 0;
       });
  }
  ngOnDestroy() {
    this.carsSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

}
