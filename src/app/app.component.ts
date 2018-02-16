import { Component } from '@angular/core';

import { JsonService } from './json.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor( private jsonService : JsonService) {
    }

    ngOnDestroy() {
      this.jsonService.alive = false;
    }
}
