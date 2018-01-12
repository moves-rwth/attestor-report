import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { OnDestroy } from "@angular/core";
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/catch';
import * as cytoscape from 'cytoscape';
import * as dagre from 'cytoscape-dagre';
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

    stateSpacePath : string = 'assets/stateSpaceData/statespace.json';
    hcPath : string = 'assets/stateSpaceData/';


    // Style for cytoscape state space generation
    statespaceStyle : any;
    hcStyle : any;

    alive : boolean;

    cy : any;

    nodeId : number;

    constructor(private http:Http) {

      dagre(cytoscape);
      //cytoscape('layout', 'dagre', 'dagre'); // register extension

      this.showStateSpace = true;
      this.displayAboutFlag = false;
      this.notLoaded = true;
      //this.displayAboutFlag = true;
      this.alive = true;

      // Load cytoscape style for state space visualisation
      this.http.get('assets/cytoscapeStyle/style.cycss')//, options)
                                       .takeWhile(() => this.alive)
                                       .subscribe(result => {
                                         this.statespaceStyle = result.text();
                                       });

      // Load cytoscape style for heap conf visualisation
      this.http.get('assets/cytoscapeStyle/styleHc.cycss')//, options)
              .takeWhile(() => this.alive)
              .subscribe(result => {
                  this.hcStyle = result.text();
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

    let cyOnCallback = function(evt) : any {
      console.log("Test: node clicked");
      let node : any = evt.target;
      let tmp : number = node.id();
      console.log("Node: " + node.id());
      console.log("NodeID: " + tmp);
      return tmp;
    };

    //let myAdd = function(x:number) { console.log("TestmyAdd" + x);};
    //let myAdd: (x: number, y: number) => number =
    //function(x: number, y: number): number { return x + y; };

      // load layout
      let layout : any = { name: 'dagre', padding: 'layoutPadding', rankDir: 'LR' };

      // Set the binded variables
      //this.stateSpacePath = ;

      console.log("Load state space");

      let elem:HTMLElement = document.getElementById("cy");
      console.log(elem);

      this.readStateSpaceJSONFile(this.stateSpacePath)
          .toPromise().then(
            (result) => {
                          this.cy = cytoscape({
                            container : elem,
                            elements: result,
                            style: this.statespaceStyle,
                            layout: layout,
                            motionBlur: true,
                            selectionType: 'single',
                            boxSelectionEnabled: false,
                            autoungrabify: true
                          });
                          this.notLoaded = false;
                          this.cy.resize();
                          this.cy.on('select unselect', 'node', function(evt){
                            this.nodeId = cyOnCallback(evt);
                            this.onNodeTap(this.nodeId);
                          }.bind(this));

                        console.log(this.nodeId);


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

    // Read the heap configuration file with id
    private readHCJSONFile(id : any){
      return this.http.get(this.hcPath + "hc_" + id + ".json")//, options)
          .takeWhile(() => this.alive)
          .map((response: Response) => {
              return response.json();
          }
          )
          .catch(this.handleError);
    }

    private onNodeTap(node : number){
      let hcContainer:HTMLElement = document.getElementById("cy2");

      let layout : any = { name: 'dagre', padding: 'layoutPadding', rankDir: 'TB', nodeSep: '50' };

      this.readHCJSONFile(node).toPromise().then(
        (hcResult) => {
          this.cy = cytoscape({
            container : hcContainer,
            elements: hcResult,
            style: this.hcStyle,
            layout: layout,
            motionBlur: true,
            selectionType: 'single',
            boxSelectionEnabled: false,
            autoungrabify: false
          });
        }
      );
    }

    private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
    }



}
