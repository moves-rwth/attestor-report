import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitConfComponent } from './init-conf.component';

const routes: Routes = [
    { path: '', component: InitConfComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InitConfRoutingModule { }
