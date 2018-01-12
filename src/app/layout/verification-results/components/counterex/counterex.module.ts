import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounterexRoutingModule } from './counterex-routing.module';
import { CounterexComponent } from './counterex.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    CounterexRoutingModule,
    NgbModule.forRoot()
  ],
  declarations: [CounterexComponent]
})
export class CounterexModule { }
