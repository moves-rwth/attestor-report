import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProgramRoutingModule } from './program-routing.module';
import { ProgramComponent } from './program.component';

import { TabsComponent } from './tabs/tabs.component';

import { PageHeaderModule } from './../../shared';

@NgModule({
  imports: [
    CommonModule,
    ProgramRoutingModule,
    NgbModule.forRoot(),
    PageHeaderModule
  ],
  declarations: [ProgramComponent,
                 TabsComponent]
})
export class ProgramModule { }
