import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import "rxjs/add/operator/takeWhile";

import {JsonService} from '../../json.service'

@Component({
    selector: 'app-mc',
    templateUrl: './mc.component.html',
    styleUrls: ['./mc.component.scss'],
    animations: [routerTransition()]
})
export class MCComponent implements OnInit {

    formulae : Array<string>;

    constructor(private jsonService:JsonService) {

      // Get the input MC formulae from settings file
      this.jsonService.readSettingsJSON().subscribe(result => {
        this.formulae = result.modelChecking.formulae.split(';');
      });

    }

    ngOnInit() {
    }

}
