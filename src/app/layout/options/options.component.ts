import { Component, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Subscription } from "rxjs/Subscription";

import{ TooltipService } from '../../tooltip.service';
import {JsonService} from '../../json.service'

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.scss'],
    animations: [routerTransition()]
})
export class OptionsComponent{

    booleanOptions : Array<any> = new Array();
    otherOptions : Array<any> = new Array();

    constructor(private tooltips:TooltipService, private jsonService:JsonService) {

      this.jsonService.readOptionsJSON().subscribe(result => {

        // Partition into boolean and other option values
        for(let option of result){
          switch(option.value){
            case 'true':{
              this.booleanOptions.push(option);
              break;
            }
            case 'false':{
              this.booleanOptions.push(option);
              break;
            }

            default: {
              this.otherOptions.push(option);
              break;
            }
          }
        }
      });
    }

    public tooltip(option : string ) : string {
      return this.tooltips.getOptionTooltip(option);
    }

}
