import { Component } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { OnDestroy } from "@angular/core";

import * as cytoscape from 'cytoscape';
import * as dagre from 'cytoscape-dagre';

import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import "rxjs/add/operator/takeWhile";

import {JsonService} from '../../json.service'
import{ CytoscapeFilterService } from '../../cytoscapeFilter.service';


@Component({
    selector: 'app-ass',
    templateUrl: './ass.component.html',
    styleUrls: ['./ass.component.scss'],
    animations: [routerTransition()]
})
export class ASSComponent{
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
    cy2 : any;

    // Information about currently selected heap state
    nodeId : number;
    stmt : any;
    ap : any;
    apPresent : boolean = false;


    constructor( public filterService:CytoscapeFilterService, private jsonService:JsonService) {

      dagre(cytoscape);

      this.showStateSpace = true;
      this.displayAboutFlag = false;
      this.notLoaded = true;
      this.alive = true;

      // Load cytoscape style for state space visualisation
      console.log("Read Statespace Style");
      this.jsonService.readStatespaceStyleJSON()
                                       .takeWhile(() => this.alive)
                                       .subscribe(result => {
                                         this.statespaceStyle = result.text();
                                       });

      // Load cytoscape style for heap conf visualisation
      console.log("Read Heap Conf Style");
      this.jsonService.readHeapConfStyleJSON()
              .takeWhile(() => this.alive)
              .subscribe(result => {
                  this.hcStyle = result.text();
      });

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
        let node : any = evt.target;
        let tmp : number = node.id();
        console.log("NodeID: " + tmp);
        return tmp;
      };

      // load layout
      let layout : any = { name: 'dagre', padding: 'layoutPadding', rankDir: 'LR' };

      console.log("Load state space");

      let elem:HTMLElement = document.getElementById("cy");
      console.log(elem);

      this.jsonService.readStatespaceJSON()
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
                            autoungrabify: false
                          });
                          this.notLoaded = false;
                          this.cy.resize();

                          // Remove all edges that are tagged as transitive
                          this.cy.edges().forEach(function( e ) {
                              var type = e.data('type');
                              if(type == 'transitive') {
                                  e.hide();
                              }
                          });

                          this.cy.on('select', 'node', function(evt){
                            this.nodeId = cyOnCallback(evt);
                            this.onNodeTap(this.nodeId);

                            //var node = this.cy.$('node:selected');
                            var node = this.cy.getElementById( this.nodeId );
                            //
                            this.stmt = node.data('statement');
                            this.ap = node.data('propositions');
                            if(this.ap.length != 0){
                              this.apPresent = true;
                            } else {
                              this.apPresent = false;
                            }
                          }.bind(this));
                        },
          )
          .catch((ex) => {
                            console.log("State space not found!");
                          });

    }

    private onNodeTap(node : number){
      let hcContainer:HTMLElement = document.getElementById("cy2");

      let layoutHC : any = { name: 'dagre', padding: 'layoutPadding', rankDir: 'TB', nodeSep: '50' };

      this.jsonService.readHCJSON(node).toPromise().then(
        (hcResult) => {
          this.cy2 = cytoscape({
            container : hcContainer,
            elements: hcResult,
            style: this.hcStyle,
            layout: layoutHC,
            motionBlur: true,
            selectionType: 'single',
            boxSelectionEnabled: false,
            autoungrabify: false
          });
        }
      );
    }

}
