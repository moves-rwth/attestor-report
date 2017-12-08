import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramRoutingModule } from './program-routing.module';
import { ProgramComponent } from './program.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
  imports: [
    CommonModule,
    ProgramRoutingModule,
    PageHeaderModule
  ],
  declarations: [ProgramComponent]
})
export class ProgramModule { }
