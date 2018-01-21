import { Component, OnInit } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import "rxjs/add/operator/takeWhile";

import {JsonService} from '../../../json.service'

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  analysedClass : string;
  classpath : string;
  analysedMethod : string;
  code : string = 'public void methodA(){ int a = 0; int b = 0; a = a + b; }';

  constructor(private jsonService:JsonService) {

          // Get the information about analysed class and method from settings file
          this.jsonService.readSettingsJSON().subscribe(result => {
            this.analysedClass = result.input.program.class;
            this.classpath  = result.input.program.classpath;
            this.analysedMethod = result.input.program.method;
          });

          // Get the anaylsed class code
          this.jsonService.readInputProgram().subscribe(result => {
            this.code = result.text();
            this.code.trim();
          });


  }

  ngOnInit() {
  }

}
