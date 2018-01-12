import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ASSComponent } from './ass.component';
import { ASSRoutingModule } from './ass-routing.module';
import { PageHeaderModule } from './../../shared';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        ASSRoutingModule,
        PageHeaderModule,
        NgbModule.forRoot()
    ],
    declarations: [ASSComponent]
})
export class ASSModule { }
