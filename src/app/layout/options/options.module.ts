import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
  imports: [
    CommonModule,
    OptionsRoutingModule,
    PageHeaderModule
  ],
  declarations: [OptionsComponent]
})
export class OptionsModule { }
