import { Component, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';


import * as cytoscape from 'cytoscape';
import * as dagre from 'cytoscape-dagre';

import{ SharedService } from '../../../../shared.service';
import {JsonService} from '../../../../json.service'

import{ CytoscapeFilterService } from '../../../../cytoscapeFilter.service';


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
    cy : any;

    statespaceStyle : any;
    hcStyle : any;

    alive : boolean;

    constructor(private formulaService : SharedService, private filterService : CytoscapeFilterService, private jsonService: JsonService) {
      dagre(cytoscape);

      this.alive = true;

      // Load cytoscape style for state space visualisation
      this.jsonService.readStatespaceStyleJSON()//, options)
                                       .takeWhile(() => this.alive)
                                       .subscribe(result => {
                                         this.statespaceStyle = result.text();
                                       });

      // Load cytoscape style for heap conf visualisation
      this.jsonService.readHeapConfStyleJSON()//, options)
                                        .takeWhile(() => this.alive)
                                        .subscribe(result => {
                                        this.hcStyle = result.text();
                                       });

    }

    private setFormulaValues() : boolean{
          if(this.id != this.formulaService.getFormulaID()){
            this.formula = this.formulaService.getFormulaString();
            this.id = this.formulaService.getFormulaID();

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


    // Load the concrete input hc
    let inputHcContainer:HTMLElement = document.getElementById("cy3");

    let layoutInputHc : any = { name: 'dagre', padding: 'layoutPadding', rankDir: 'TB', nodeSep: '50' };

    let cyInput : any;
    this.jsonService.readTraceInputHCJSON(this.id).toPromise().then(
      (inputHcResult) => {
        cyInput = cytoscape({
          container : inputHcContainer,
          elements: inputHcResult,
          style: this.hcStyle,
          layout: layoutInputHc,
          motionBlur: true,
          selectionType: 'single',
          boxSelectionEnabled: false,
          autoungrabify: false
        });
      }
    );




      // load layout
      let layout : any = { name: 'dagre', padding: 'layoutPadding', rankDir: 'LR' };

      // Set the binded variables
      //this.stateSpacePath = ;

      let elem:HTMLElement = document.getElementById("cy");
      console.log(elem);

      let nodeId : number;

      console.log('Read failing trace');
      this.jsonService.readTraceJSON(this.id)
          .toPromise().then(
            (result) => {
                          console.log(result);
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
                          this.cy.resize();

                          // Remove all edges that are tagged as transitive
                          this.cy.edges().forEach(function( e ) {
                              var type = e.data('type');
                              if(type == 'transitive') {
                                  e.hide();
                              }
                          });

                          this.cy.on('select unselect', 'node', function(evt){
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

    private onNodeTap(node : number){
      let hcContainer:HTMLElement = document.getElementById("cy2");

      let layout : any = { name: 'dagre', padding: 'layoutPadding', rankDir: 'TB', nodeSep: '50' };

      let cy : any;
      this.jsonService.readTraceHCJSON(this.id, node).toPromise().then(
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

    ngOnDestroy(){
      this.alive = false;
    }
}
