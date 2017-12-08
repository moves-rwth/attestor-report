import { Component, OnInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-program',
    templateUrl: './program.component.html',
    styleUrls: ['./program.component.scss'],
    animations: [routerTransition()]
})
export class ProgramComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }
}
