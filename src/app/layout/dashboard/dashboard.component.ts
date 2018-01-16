import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, NavigationEnd } from '@angular/router';


import "rxjs/add/operator/takeWhile";
import 'rxjs/add/operator/catch';

import {JsonService} from '../../json.service'


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

    public alerts: Array<any> = [];
    public messages: Array<any> = [];

    public scenarioName : string = '';
    public scenarioDesc : string = '';
    public numberStates : number;
    public numberTermStates : number;
    public numberSuccessfulForm : number;
    public numberFailForm : number;

    constructor(private jsonService:JsonService, private router: Router) {

      console.log("Read summary file");
      this.jsonService.readSettingsJSON().subscribe(result => {
                                              this.scenarioName = result.name;
                                              this.scenarioDesc = result.scenario;
                                          });

      // Load json file with general attestor output
      console.log("Read analysis summary file");
      this.jsonService.readAnalysisSummaryJSON().subscribe(result => {
                                              this.numberStates = result["0"].summary["0"].numberStates;
                                              this.numberTermStates = result["0"].summary["1"].numberTerminalStates;
                                              this.numberSuccessfulForm = result["0"].summary["2"].numberFormulaeSuccess;
                                              this.numberFailForm = result["0"].summary["3"].numberFormulaeFail;
                                              this.messages = result["3"].messages;
                                          });

      console.log("Read analysis summary file");
      this.jsonService.readMessagesJSON().subscribe( result => {
                                            this.messages = result;
                                            this.fillAlerts(this.messages);
                                          });
    }



    ngOnInit() {
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
      };

      this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
          this.router.navigated = false;
          window.scrollTo(0, 0);
        }
      });

    }

    public fillAlerts(input:Array<any>){
      let message : any;
      for(message in input){
        let type : string = "";
        console.log("Message type: " + input[message].level);
        switch(input[message].level){
          case "info": type = "info"; break;
          case "WARN": type = "warning"; break;
          case "LTL-SAT": type = "success"; break;
          case "LTL-UNSAT": type = "danger"; break;
        }

        if( type !== ""){
          this.alerts.push({
            id: message,
            type: type,
            message: input[message].message
          });
        }
      }
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
