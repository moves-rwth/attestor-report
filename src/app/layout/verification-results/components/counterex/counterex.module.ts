import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounterexRoutingModule } from './counterex-routing.module';
import { CounterexComponent } from './counterex.component';

@NgModule({
  imports: [
    CommonModule,
    CounterexRoutingModule
  ],
  declarations: [CounterexComponent]
})
export class CounterexModule { }
