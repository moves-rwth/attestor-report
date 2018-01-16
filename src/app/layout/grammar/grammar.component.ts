import { Component, OnInit } from '@angular/core';
import { OnDestroy } from "@angular/core";
import { routerTransition } from '../../router.animations';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/catch';
import * as cytoscape from 'cytoscape';
import 'rxjs/add/operator/toPromise';
import "rxjs/add/operator/takeWhile";

import {JsonService} from '../../json.service'


@Component({
    selector: 'app-grammar',
    templateUrl: './grammar.component.html',
    styleUrls: ['./grammar.component.scss'],
    animations: [routerTransition()]
})
export class GrammarComponent implements OnInit {
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


    constructor(private jsonService:JsonService) {
      this.rulePath = '';
      this.alive = true;

      // Get rule names from grammar file
      this.grammarSubscription = this.jsonService.readGrammarJSON().subscribe(result => {
                                              this.ntEntry = result;
                                              this.ruleNames = result["0"].rules;
                                              }
                                            );

     // Load style
     this.tempsubscription = this.jsonService.readHeapConfStyleJSON()//, options)
                                      .takeWhile(() => this.alive)
                                      .subscribe(result => {
                                        this.hcStyle = result.text();
                                      });

      this.showRule = true;

    }

    ngOnInit() {

    }

    ngOnDestroy(){
      this.alive = false;
    }

    // Load the input rule and let cytoscape render it into the rule container
    public loadRule(ntName : string, ruleIndex : number){
      this.showRule = true;

      let ruleData : any ;

      this.jsonService.readRuleJSON(ntName,ruleIndex)
          .toPromise().then(
            (result) => {
                          let elem:HTMLElement = document.getElementById("rule");
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
