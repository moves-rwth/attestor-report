import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputComponent } from './input.component';
import { InputRoutingModule } from './input-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        InputRoutingModule,
        PageHeaderModule
    ],
    declarations: [InputComponent]
})
export class InputModule { }
