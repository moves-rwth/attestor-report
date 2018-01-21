import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { JsonService } from '../../../json.service';
import { LocationService } from '../../../location.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

    pushRightClass: string = 'push-right';

    benchmarks : Array<Object> = [];

    alive : boolean = true;
    displayDropdown : boolean = false;

    constructor(private http: Http, private jsonService:JsonService, private locationService:LocationService, public router: Router) {
        //this.router.events.subscribe((val) => {
        //    if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        //        this.toggleSidebar();
        //    }
        //});

        this.benchmarks = locationService.getBenchmarks();
        console.log("Read benchmarks from locationService: " + this.benchmarks);


        /*console.log("Header read benchmark");
        this.http.get('http://localhost:9200/benchmark')
                  .map(response => response.json())
                  .toPromise().then(result => {
                    console.log("Successfully read, now proceed");
                    this.benchmarks = result;
                    this.displayDropdown = true;
                    //if (this.router.url === '/') {
                    //    this.router.navigate(['/dashboard']);
                    //}
                  });*/

        //this.locationService.getBenchmarks().subscribe( (result : Array<any>) => {
        //    this.benchmarks = result;
        //});

      }

      ngOnInit() {
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
      console.log("Clicked");
      this.locationService.bid = newBId;
      console.log("Bid set to " + newBId);

      this.router.navigate(["/dashboard", { queryParams: { 'refresh': 1 } }]);
    }
}
