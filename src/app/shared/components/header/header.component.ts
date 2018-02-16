import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { JsonService } from '../../../json.service';
import { LocationService } from '../../../location.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

    pushRightClass: string = 'push-right';

    benchmarks : Array<Object> = [];

    alive : boolean = true;
    displayDropdown : boolean = false;

    constructor(private http: Http, private jsonService:JsonService, private locationService:LocationService, public router: Router) {

        this.benchmarks = locationService.getBenchmarks();
        console.log("Read benchmarks from locationService: " + this.benchmarks);

      }

    readBenchmarks(){
      console.log("Read benchmarks");
      this.benchmarks = this.locationService.getBenchmarks();
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    routeToBenchmark(newBId : number){
      this.locationService.bid = newBId;
      console.log("Bid set to " + newBId);

      this.router.navigate(['/dashboard', { 'refresh': newBId}]);
    }
}
