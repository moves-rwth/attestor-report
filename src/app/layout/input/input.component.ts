import { Component, OnInit } from '@angular/core';
import { OnDestroy } from "@angular/core";
import { routerTransition } from '../../router.animations';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/catch';
import * as cytoscape from 'cytoscape';
import 'rxjs/add/operator/toPromise';
import "rxjs/add/operator/takeWhile";




@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    animations: [routerTransition()]
})
export class InputComponent implements OnInit {
    private grammarSubscription : Subscription;
    ntEntry : Array<Object>;
    ruleName : string;
    ruleNames : Array<String>;
    rulePath : string;

    // Indicates whether the rule file for the clicked rule could be found
    showRule : boolean;

    // CSS Style file for cytoscape
    hcStyle : any;
    tempsubscription : Subscription;

    alive : boolean;


    constructor(private http:Http) {
      this.rulePath = '';
      this.alive = true;

      // Get rule names from grammar file
      this.grammarSubscription = this.readGrammarJSONFile().subscribe(result => {
                                              this.ntEntry = result;
                                              this.ruleNames = result["0"].rules;
                                              }
                                            );

     // Load style
     this.tempsubscription = this.http.get('assets/cytoscapeStyle/styleHc.cycss')//, options)
                                      .takeWhile(() => this.alive)
                                      .subscribe(result => {
                                        this.hcStyle = result.text();
                                      });
     //this.grammarSubscription.add(this.tempsubscription);

      this.showRule = true;

    }

    ngOnInit() {

    }

    ngOnDestroy(){
      this.alive = false;
    }

    readGrammarJSONFile(){
      // get users from api
          return this.http.get('assets/grammarData/grammarExport.json')//, options)
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

    // Load the input rule and let cytoscape render it into the rule container
    public loadRule(ntName : string, ruleIndex : number){
      this.showRule = true;
      // Set the binded variables
      this.ruleName = ntName + ' Rule' + ruleIndex;
      this.rulePath = 'assets/grammarData/' + ntName + 'Rule' + ruleIndex + '.json';

      let ruleData : any ;
      let elem:HTMLElement = document.getElementById("rule");

      this.readRuleJSONFile(ntName + 'Rule' + ruleIndex)
          .toPromise().then(
            (result) => {
                          cytoscape({
                            container : elem,
                            elements: result,
                            style: this.hcStyle
                          });
                        },
          )
          .catch((ex) => {
                            this.rulePath = 'File not found';
                            this.showRule = false;
                          });
    }

    // Read the provided rule file
    private readRuleJSONFile(filename : string){

      return this.http.get('assets/grammarData/' + filename + '.json')//, options)
          .takeWhile(() => this.alive)
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
