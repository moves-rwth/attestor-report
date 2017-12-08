import { Component, OnInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.scss'],
    animations: [routerTransition()]
})
export class OptionsComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }
}
