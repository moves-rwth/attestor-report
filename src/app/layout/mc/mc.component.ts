import { Component, OnInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-mc',
    templateUrl: './mc.component.html',
    styleUrls: ['./mc.component.scss'],
    animations: [routerTransition()]
})
export class MCComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }
}
