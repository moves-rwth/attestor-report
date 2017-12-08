import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MCRoutingModule } from './mc-routing.module';
import { MCComponent } from './mc.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
  imports: [
    CommonModule,
    MCRoutingModule,
    PageHeaderModule
  ],
  declarations: [MCComponent]
})
export class MCModule { }
