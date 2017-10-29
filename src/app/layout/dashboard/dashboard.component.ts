import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    
    constructor() {

        this.alerts.push({
            id: 1,
            type: 'success',
            message: `No null pointer dereferences detected.`
        }, {
            id: 2,
            type: 'warning',
            message: `Null pointer dereferences detected.`
        }, {
            id: 2,
            type: 'success',
            message: `State space generation successful.`
        }, {
          id: 3,
          type: 'warning',
          message: 'State space generation aborted (maximal state space or heap size exceeded).'
        });
    }

    ngOnInit() {
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
