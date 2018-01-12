import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CounterexComponent } from './counterex.component';

const routes: Routes = [
    { path: '', component: CounterexComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CounterexRoutingModule { }
