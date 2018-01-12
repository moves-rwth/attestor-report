import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Http, Response } from '@angular/http';

import "rxjs/add/operator/takeWhile";
import 'rxjs/add/operator/catch';

@Component({
    selector: 'app-verification-results',
    templateUrl: './verification-results.component.html',
    styleUrls: ['./verification-results.component.scss'],
    animations: [routerTransition()]
})
export class VerificationResultsComponent implements OnInit {
    alive : boolean;

    runtimePhasesArray : Array<any>;
    runtimeTotalArray : Array<any>;

    stateSpaceArray : Array<any>;

    mcresultsArray : Array<any>;


    constructor(private http:Http) {
      this.alive = true;

      // Load json file with general attestor output
      console.log("Read summary file");
      this.readGeneralInfoJSONFile().subscribe(result => {
                                              console.log(result);
                                              this.runtimePhasesArray = result["1"].runtime["0"].phases;
                                              this.runtimeTotalArray = result["1"].runtime["1"].total;
                                              this.stateSpaceArray = result["2"].stateSpace;
                                              this.mcresultsArray = result["4"].mcresults;
                                          });





    }
    ngOnInit() { }

    ngOnDestroy(){
      this.alive = false;
    }

    readGeneralInfoJSONFile(){
          return this.http.get('assets/attestorOutput/analysisSummary.json')//, options)
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
