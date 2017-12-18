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

    public scenarioName : string;
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
                                              this.scenarioName = result["0"].summary["0"].name;
                                              this.numberStates = result["0"].summary["1"].numberStates;
                                              this.numberTermStates = result["0"].summary["2"].numberTerminalStates;
                                              this.numberSuccessfulForm = result["0"].summary["3"].numberFormulaeSuccess;
                                              this.numberFailForm = result["0"].summary["4"].numberFormulaeFail;
                                              this.messages = result["3"].messages;
                                          });

      this.readMessagesJSONFile().subscribe( result => {
                                            this.messages = result;
                                            this.fillAlerts(this.messages);
                                          });
    }



    ngOnInit() {

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

    ngOnDestroy(){
      this.alive = false;
    }

    readGeneralInfoJSONFile(){
      // get users from api
          return this.http.get('assets/attestorOutput/analysisSummary.json')//, options)
              .takeWhile(() => this.alive)
              .map((response: Response) => {
                  return response.json();
              }
          )
          .catch(this.handleError);
    }

    readMessagesJSONFile(){
      // get users from api
          return this.http.get('assets/attestorOutput/messages.json')//, options)
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
