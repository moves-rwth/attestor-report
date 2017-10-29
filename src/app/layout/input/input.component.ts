import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    animations: [routerTransition()]
})
export class InputComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}
