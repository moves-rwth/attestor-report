import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }    from '@angular/http';

import { InputComponent } from './input.component';
import { InputRoutingModule } from './input-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        InputRoutingModule,
        PageHeaderModule,
        HttpModule
    ],
    declarations: [InputComponent]
})
export class InputModule { }
