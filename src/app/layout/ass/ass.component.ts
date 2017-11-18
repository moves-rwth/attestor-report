import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { OnDestroy } from "@angular/core";
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/catch';
import * as cytoscape from 'cytoscape';
import 'rxjs/add/operator/toPromise';
import "rxjs/add/operator/takeWhile";

@Component({
    selector: 'app-ass',
    templateUrl: './ass.component.html',
    styleUrls: ['./ass.component.scss'],
    animations: [routerTransition()]
})
export class ASSComponent implements OnInit {
    showStateSpace : boolean;
    displayAboutFlag : boolean;
    notLoaded : boolean;

    stateSpacePath : string;

    // Style for cytoscape state space generation
    style : any;

    alive : boolean;

    constructor(private http:Http) {
      this.showStateSpace = true;
      this.displayAboutFlag = false;
      this.notLoaded = true;
      //this.displayAboutFlag = true;
      this.alive = true;

      // Load style
      this.http.get('assets/cytoscapeStyle/style.cycss')//, options)
                                       .takeWhile(() => this.alive)
                                       .subscribe(result => {
                                         this.style = result.text();
                                       });

    }
    ngOnInit() {
    }

    ngAfterViewInit()	{
      this.loadStateSpace();

    }


    ngOnDestroy(){
      this.alive = false;
    }


    displayAbout(){
      this.displayAboutFlag = true;
    }


    // Load the input rule and let cytoscape render it into the rule container
    public loadStateSpace(){

      // TODO load layout
      let layout : any;
      layout = '';
      //layout = '{
      //    name: 'dagre',
      //    padding: layoutPadding,
      //    rankDir: 'LR',
      //  }';

      // Set the binded variables
      this.stateSpacePath = 'assets/statespace.json';

                                             console.log("Load state space");

      let stateSpaceData : any ;
      let elem:HTMLElement = document.getElementById("cy");
      console.log(elem);

      this.readStateSpaceJSONFile(this.stateSpacePath)
          .toPromise().then(
            (result) => {
                          cytoscape({
                            container : elem,
                            elements: result,
                            style: this.style,
                            //layout: layout;
                            motionBlur: true,
                            selectionType: 'single',
                            boxSelectionEnabled: false,
                            autoungrabify: true
                          });
                          this.notLoaded = false;
                        },
          )
          .catch((ex) => {
                            console.log("State space not found!");
                          });
    }

    // Read the provided state space file
    private readStateSpaceJSONFile(filename : string){

      return this.http.get(filename)//, options)
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
