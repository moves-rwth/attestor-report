import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Http, Response } from '@angular/http';

import "rxjs/add/operator/takeWhile";
import 'rxjs/add/operator/catch';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    alive : boolean;

    public alerts: Array<any> = [];
    public messages: Array<any> = [];
    public numberStates : number;
    public numberTermStates : number;
    public numberSuccessfulForm : number;
    public numberFailForm : number;

    constructor(private http:Http) {
      this.alive = true;

      // Load json file with general attestor output
      console.log("Read summary file");
      this.readGeneralInfoJSONFile().subscribe(result => {
                                              console.log(result);
                                              this.numberStates = result["0"].summary["0"].numberStates;
                                              this.numberTermStates = result["0"].summary["1"].numberTerminalStates;
                                              this.numberSuccessfulForm = result["0"].summary["2"].numberFormulaeSuccess;
                                              this.numberFailForm = result["0"].summary["3"].numberFormulaeFail;
                                              this.messages = result["3"].messages;

                                              this.fillAlerts(this.messages);
                                          });
    }

    ngOnInit() {
    }

    public fillAlerts(input:Array<any>){
      let type : string = "";
      let message : any;
      for(message in input){
        console.log(message);
        console.log("Message type: " + input[message].type);
        switch(input[message].type){
          case "error": type = "danger"; break;
          case "info": type = "info"; break;
          case "warn": type = "warning"; break;
          case "success": type = "success"; break;
        }

        this.alerts.push({
          id: message,
          type: type,
          message: input[message].message
        });
      }
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    ngOnDestroy(){
      this.alive = false;
    }

    readGeneralInfoJSONFile(){
      // get users from api
          return this.http.get('assets/attestorOutput/testSummary.json')//, options)
              .takeWhile(() => this.alive)
              .map((response: Response) => {
                  return response.json();
              }
          )
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
    }
}
