import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/catch';
//import ntEntry from './grammarData/grammarExport.json'

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    animations: [routerTransition()]
})
export class InputComponent implements OnInit {
  nt : String;
  ntEntry : Array<Object>;
    constructor(private http:Http) {

      this.readGrammarJSONFile().subscribe(result => {
                                              console.log("inside",result);
                                              this.ntEntry = result;
                                              console.log("ntEntry", this.ntEntry);
                                              console.log("ntTest", this.ntEntry["0"].nonterminal);
                                              return result;
                                              }
                                            );
    }
    ngOnInit() {
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
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }


    /*$(function(){

$.getJSON('./grammarData/grammarExport.json', function(grammarData){
    for(i = 0; i < grammarData.length; i++){
        var ntEntry = grammarData[i];

        var heading = document.createElement('h3');
        document.getElementById('grammar').appendChild(heading);
        heading.innerHTML = ntEntry.nonterminal;

        var list = document.createElement('ul');
        document.getElementById('grammar').appendChild(list);


        for(j = 0; j < ntEntry.rules.length; j++){
            var ruleNumber = j + 1;
            var id = ntEntry.nonterminal + 'Rule' + ruleNumber;
            var listEntry = document.createElement('li');
            list.appendChild(listEntry);
            listEntry.setAttribute('id', id);
            listEntry.setAttribute('style', 'cursor:pointer');
            listEntry.innerHTML = ntEntry.rules[j];
            listEntry.onclick = function() {viewRule(this)};
        }
    }
})

})*/

}
