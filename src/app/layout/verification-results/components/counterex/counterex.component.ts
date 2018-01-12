import { Component, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';


import * as cytoscape from 'cytoscape';
import * as dagre from 'cytoscape-dagre';

import{ SharedService } from '../../../../shared.service';

import 'rxjs/add/operator/toPromise';
import "rxjs/add/operator/takeWhile";


@Component({
    selector: 'counterex',
    templateUrl: './counterex.component.html',
    styleUrls: ['./counterex.component.scss']
})
export class CounterexComponent {

    formula : string;
    id : number;

    statespaceStyle : any;
    hcStyle : any;

    tracePath : string;
    hcPath : string;

    alive : boolean;

    constructor(private http:Http, private formulaService : SharedService) {
      dagre(cytoscape);

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

    private setFormulaValues() : boolean{
          if(this.id != this.formulaService.getFormulaID()){
            this.formula = this.formulaService.getFormulaString();
            this.id = this.formulaService.getFormulaID();

            this.tracePath = 'assets/attestorOutput/counterex' + this.id +'/trace.json';
            this.hcPath = 'assets/attestorOutput/counterex' + this.id + '/';
            return true;
          } else {
            return false;
          }
    }

    ngDoCheck(){
      if( this.setFormulaValues()){
        this.loadCTrace();
      }
    }

    // Load the failing trace and render it via cytoscape
    public loadCTrace(){

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

      console.log("Load failing trace");

      let elem:HTMLElement = document.getElementById("cy");
      console.log(elem);

      let cy : any;
      let nodeId : number;

      this.readStateSpaceJSONFile(this.tracePath)
          .toPromise().then(
            (result) => {
                          console.log(result);
                          cy = cytoscape({
                            container : elem,
                            elements: result,
                            style: this.statespaceStyle,
                            layout: layout,
                            motionBlur: true,
                            selectionType: 'single',
                            boxSelectionEnabled: false,
                            autoungrabify: true
                          });
                          cy.resize();
                          cy.on('select unselect', 'node', function(evt){
                            nodeId = cyOnCallback(evt);
                            this.onNodeTap(nodeId);
                          }.bind(this));

                        console.log(nodeId);


                        },
          )
          .catch((ex) => {
                            console.log("Trace file not found!");
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

    private onNodeTap(node : number){
      let hcContainer:HTMLElement = document.getElementById("cy2");

      let layout : any = { name: 'dagre', padding: 'layoutPadding', rankDir: 'TB', nodeSep: '50' };

      let cy : any;
      this.readHCJSONFile(node).toPromise().then(
        (hcResult) => {
          cy = cytoscape({
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


    render(){

      let elem:HTMLElement = document.getElementById("cy")
            // Load style
      console.log(elem);

                // Load rule data and display rule graph
                let ruleData1 : any = { "nodes": [{"data": {"id": "a", "label": "Gene1"}},{"data": {"id": "b", "label": "Gene2"}}],"edges": [{"data": {"id": "ab","source": "a", "target": "b"}}]};
                let styleData : any = 'node { background-color: red; }';

                // Render rule
                cytoscape({
                    container : elem,
                    elements: ruleData1,
                    style: styleData
                });
      console.log("Cytoscape finished");
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

    ngOnDestroy(){
      this.alive = false;
    }
}
