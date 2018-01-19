import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { Http, Response } from '@angular/http';
import { TimerObservable } from "rxjs/observable/TimerObservable";

import { LocationService } from '../location.service'
import { JsonService } from '../json.service'



@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    read : boolean = true;
    alive : boolean = true;

    constructor(public router: Router,private http:Http, private locationService:LocationService, private jsonService:JsonService) {

      if(this.locationService.bid == undefined){
        console.log("Initially setting read to false");
        this.read = false;
      }

      // Refresh every 5 seconds
      TimerObservable.create(0, 5000)
        .takeWhile(() => this.alive)
        .subscribe(() => {
          console.log("Subscribing");
          this.http.get(LocationService.benchmarks)
                .map(response =>
                  response.json()
                  )
                .subscribe(result => {
                  console.log("Successfully read, now proceed");
                  if(this.locationService.benchmarks != result){
                    this.locationService.benchmarks = result;
                  }

                  // Only set the currently active bid, if none is set
                  if(this.locationService.bid == undefined){
                    this.locationService.bid = result[0].id;
                    console.log("Initially setting bid");
                    this.read = true;
                  }

                  // Display the report
                  //if (this.router.url === '/') {
                  //    this.router.navigate(['/dashboard']);
                  //}
                })
              });
    }

    ngOnInit() {
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }
    }

    ngOnDestroy(){
      this.alive = false;
    }

}
