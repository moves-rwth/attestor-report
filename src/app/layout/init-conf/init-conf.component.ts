import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/catch';
import * as cytoscape from 'cytoscape';
import 'rxjs/add/operator/toPromise';
import "rxjs/add/operator/takeWhile";

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

    constructor(private http:Http) {
      this.initHCPath = '';
      this.alive = true;

      // Get rule names from grammar file
      this.readInitialHCsSummaryJSONFile().subscribe(result => {
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
     this.http.get('assets/cytoscapeStyle/styleHc.cycss')//, options)
                                      .takeWhile(() => this.alive)
                                      .subscribe(result => {
                                        this.hcStyle = result.text();
                                      });

      this.showInitHC = true;

    }

    ngOnInit() {
    }

    readInitialHCsSummaryJSONFile(){
      // get the summary information of the initial HCs
          return this.http.get('assets/attestorInput/initialHCsSummary.json')//, options)
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

    private loadInitHC(HCid : number){
      this.showInitHC = true;
      this.initialHCNumber = HCid;

      this.initHCPath = 'assets/attestorInput/initialHC' + HCid + '.json';




      this.readHCJSONFile(this.initHCPath)
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

    // Read the provided inital HC file
    private readHCJSONFile(path : string){

      return this.http.get(path) //, options)
          .takeWhile(() => this.alive)
          .map((response: Response) => {
              return response.json();
          }
          )
          .catch(this.handleError);
    }

    ngOnDestroy(){
      this.alive = false;
    }

}
