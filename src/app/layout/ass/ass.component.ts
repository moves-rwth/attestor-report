import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-ass',
    templateUrl: './ass.component.html',
    styleUrls: ['./ass.component.scss'],
    animations: [routerTransition()]
})
export class ASSComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}
