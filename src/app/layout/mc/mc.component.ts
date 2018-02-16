import { Component, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Subscription } from "rxjs/Subscription";

import {JsonService} from '../../json.service'

@Component({
    selector: 'app-mc',
    templateUrl: './mc.component.html',
    styleUrls: ['./mc.component.scss'],
    animations: [routerTransition()]
})
export class MCComponent{

    formulae : Array<string>;

    constructor(private jsonService:JsonService) {

      // Get the input MC formulae from settings file
      this.jsonService.readSettingsJSON().subscribe(result => {
        if(result.modelChecking.formulae != undefined) {
          this.formulae = result.modelChecking.formulae.split(';');
        }
      });

    }
}
