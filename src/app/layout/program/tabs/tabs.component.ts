import { Component } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import {JsonService} from '../../../json.service'

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {

  analysedClass : string;
  classpath : string;
  analysedMethod : string;
  code : string = '';

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

}
