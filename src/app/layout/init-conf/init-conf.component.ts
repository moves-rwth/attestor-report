import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/catch';
import * as cytoscape from 'cytoscape';
import 'rxjs/add/operator/toPromise';
import "rxjs/add/operator/takeWhile";

import { JsonService } from '../../json.service';

@Component({
    selector: 'app-init-conf',
    templateUrl: './init-conf.component.html',
    styleUrls: ['./init-conf.component.scss'],
    animations: [routerTransition()]
})
export class InitConfComponent implements OnInit {

      numberInitHCs : number;
      initHCs : Array<number>;
      initHCPath : string;

      initialHCNumber : number;

      showInitHC : boolean;
      alive : boolean;

      // CSS Style file for cytoscape
      hcStyle : any;

    constructor(private jsonService:JsonService) {
      this.initHCPath = '';
      this.alive = true;

      // Get rule names from grammar file
      this.jsonService.readInitialHCsSummaryJSON().subscribe(result => {
                                              this.numberInitHCs = result.number;
                                              console.log(this.numberInitHCs);
                                              this.initHCs = new Array(this.numberInitHCs);
                                              let i : number;
                                              for (i = 0; i < this.numberInitHCs; i++)
                                              {
                                                this.initHCs[i] = i;
                                              };
                                              console.log(this.initHCs);

                                              }
                                            );

     // Load style
     this.jsonService.readHeapConfStyleJSON()//, options)
                                      .takeWhile(() => this.alive)
                                      .subscribe(result => {
                                        this.hcStyle = result.text();
                                      });

      this.showInitHC = true;

    }

    ngOnInit() {
    }

    private loadInitHC(HCid : number){
      this.showInitHC = true;
      this.initialHCNumber = HCid;

      this.jsonService.readInitHCJSON(HCid)
          .toPromise().then(
            (result) => {
                          let elem:HTMLElement = document.getElementById('initHC');
                          console.log('Inital HC json file read');
                          cytoscape({
                            container : elem,
                            elements: result,
                            style: this.hcStyle
                          });
                        },
          )
          .catch((ex) => {
                            this.initHCPath = 'File not found';
                            this.showInitHC = false;
                          });
    }

    ngOnDestroy(){
      this.alive = false;
    }

}
