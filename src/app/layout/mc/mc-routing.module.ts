import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MCComponent } from './mc.component';

const routes: Routes = [
    { path: '', component: MCComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MCRoutingModule { }
