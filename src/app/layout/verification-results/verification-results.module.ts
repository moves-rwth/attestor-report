import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationResultsComponent } from './verification-results.component';
import { VerificationResultsRoutingModule } from './verification-results-routing.module';
import { PageHeaderModule } from './../../shared';
import {
    TimelineComponent,
    NotificationComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        VerificationResultsRoutingModule,
        PageHeaderModule
    ],
    declarations: [VerificationResultsComponent,
    TimelineComponent,
    NotificationComponent]
})
export class VerificationResultsModule { }
