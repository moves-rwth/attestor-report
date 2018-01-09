import { Component, OnInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';

import 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-java';

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
