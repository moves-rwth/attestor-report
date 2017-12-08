import { Component, OnInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-init-conf',
    templateUrl: './init-conf.component.html',
    styleUrls: ['./init-conf.component.scss'],
    animations: [routerTransition()]
})
export class InitConfComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }
}
