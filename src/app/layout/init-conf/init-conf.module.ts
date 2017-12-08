import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitConfRoutingModule } from './init-conf-routing.module';
import { InitConfComponent } from './init-conf.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
  imports: [
    CommonModule,
    InitConfRoutingModule,
    PageHeaderModule
  ],
  declarations: [InitConfComponent]
})
export class InitConfModule { }
