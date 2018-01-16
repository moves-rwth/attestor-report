import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Http, Response } from '@angular/http';

import "rxjs/add/operator/takeWhile";
import 'rxjs/add/operator/catch';

import {JsonService} from '../../json.service'

@Component({
    selector: 'app-verification-results',
    templateUrl: './verification-results.component.html',
    styleUrls: ['./verification-results.component.scss'],
    animations: [routerTransition()]
})
export class VerificationResultsComponent implements OnInit {

    runtimePhasesArray : Array<any>;
    runtimeTotalArray : Array<any>;

    stateSpaceArray : Array<any>;

    mcresultsArray : Array<any>;


    constructor(private jsonService:JsonService) {

      // Load json file with general attestor output
      console.log("Read summary file");
      this.jsonService.readAnalysisSummaryJSON().subscribe(result => {
                                              console.log(result);
                                              this.runtimePhasesArray = result["1"].runtime["0"].phases;
                                              this.runtimeTotalArray = result["1"].runtime["1"].total;
                                              this.stateSpaceArray = result["2"].stateSpace;
                                              this.mcresultsArray = result["4"].mcresults;
                                          });





    }
    ngOnInit() { }
}
