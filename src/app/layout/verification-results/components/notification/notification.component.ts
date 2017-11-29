import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

    @Input() formulae;

    constructor() {
    }
    ngOnInit() {

    }

    ngAfterViewChecked(){
      console.log("Notification " + this.formulae["0"].formula);

    }
}
