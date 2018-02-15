import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { map } from 'rxjs/operators';

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

    constructor(public route : ActivatedRoute, public router: Router,private http:Http, private locationService:LocationService, private jsonService:JsonService) {

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
            .pipe(
                map(response =>
                  response.json()
                  )
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
                    this.router.navigate(['/dashboard', { 'refresh': Math.floor(Math.random() * (100000 - 1 + 1)) + 1}]);
                      //this.router.navigate([this.router.url]);
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
