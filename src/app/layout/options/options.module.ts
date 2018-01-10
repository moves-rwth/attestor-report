import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options.component';
import { PageHeaderModule } from './../../shared';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    OptionsRoutingModule,
    PageHeaderModule,
    NgbModule.forRoot()
  ],
  declarations: [OptionsComponent]
})
export class OptionsModule { }
