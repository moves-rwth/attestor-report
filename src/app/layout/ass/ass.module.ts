import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ASSComponent } from './ass.component';
import { ASSRoutingModule } from './ass-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        ASSRoutingModule,
        PageHeaderModule
    ],
    declarations: [ASSComponent]
})
export class ASSModule { }
