import { Component, OnInit, Input } from '@angular/core';

import { SharedService } from '../../../../shared.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

    @Input() formulae;

    constructor(private formulaService : SharedService) {
    }

    setFormula(id : number, formula : string){
      console.log('Set formula string in notification:' + formula + ' ' + id);
      this.formulaService.setFormula(id, formula);
    }

}
