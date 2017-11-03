import { Component, OnInit } from '@angular/core';
import { OnDestroy } from "@angular/core";
import { routerTransition } from '../../router.animations';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/catch';
import * as cytoscape from 'cytoscape';




@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    animations: [routerTransition()]
})
export class InputComponent implements OnInit {
    private grammarSubscription : Subscription;
    ntEntry : Array<Object>;
    ruleNames : Array<String>;
    ruleDisplay : number;

    constructor(private http:Http) {
      this.ruleDisplay = 0;

      this.grammarSubscription = this.readGrammarJSONFile().subscribe(result => {
                                              this.ntEntry = result;
                                              this.ruleNames = result["0"].rules;
                                              }
                                            );

    }
    ngOnInit() {

      console.log("Finished");

    }

    ngOnDestroy(){
      this.grammarSubscription.unsubscribe();
    }

    readGrammarJSONFile(){
      // get users from api
          return this.http.get('assets/grammarData/grammarExport.json')//, options)
              .map((response: Response) => {
                  return response.json();
              }
          )
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
    }

    public loadRule(ntName : string, ruleIndex : number){
      let ruleData : any = { "nodes": [{"data": {"id": "a", "label": "Gene1"}},{"data": {"id": "b", "label": "Gene2"}}],"edges": [{"data": {"id": "ab","source": "a", "target": "b"}}]};
      this.ruleDisplay = this.ruleDisplay + 1;

      const tempsubscription = this.readRuleJSONFile(ntName + 'Rule' + ruleIndex).subscribe(result => {
                                              console.log("Rule graph", result);
                                              ruleData = result;
                                              }
                                            );
      this.grammarSubscription.add(tempsubscription);

      console.log(ruleData);
      let elem:HTMLElement = document.getElementById("rule");
      let styleData : any = 'node { background-color: red; }';

      cytoscape({
          container : elem,
          elements: ruleData,
          style: styleData
      });


      //var cy = cytoscape({ elements: ruleData, container: document.getElementById('rule') });
      //cy.resize();
      // Render rule graph
      /*var cy2 = cytoscape({
          container: document.getElementById('rule'),
          layout: '{name: "breadthfirst"}',
          style: hcStyle,
          elements: ruleData,
          selectionType: 'single',
          boxSelectionEnabled: false,
          autoungrabify: false ,
          zoom: 1
      });*/


    }

    private readRuleJSONFile(filename : string){

      return this.http.get('assets/grammarData/' + filename + '.json')//, options)
          .map((response: Response) => {
              return response.json();
          }
      )
      .catch(this.handleError);
    }

/*
    function viewRule(ruleName){

        clearDivs();

        // Load style
        var hcStyle = $.ajax({
        url: './lib/styleHc.cycss',
        type: 'GET',
        dataType: 'text'
        });

        // Load rule data and display rule graph
        var ruleData = $.getJSON('./grammarData/' + ruleName.id + '.json', function(ruleData){

            // Display rule name
            document.getElementById('ruleHeading').innerHTML += '<h2> ' + ruleName.id + '</h2>';

            // Render rule
            cy2 = cytoscape({
                container: document.getElementById('rule'),
                layout: {
                    name: 'breadthfirst'
                },
                style: hcStyle,
                elements: ruleData.elements,
                selectionType: 'single',
                boxSelectionEnabled: false,
                autoungrabify: false ,
                zoom: 1
            });


        });
    }
*/

}
