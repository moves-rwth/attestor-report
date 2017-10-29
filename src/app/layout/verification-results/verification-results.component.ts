import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-verification-results',
    templateUrl: './verification-results.component.html',
    styleUrls: ['./verification-results.component.scss'],
    animations: [routerTransition()]
})
export class VerificationResultsComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}
