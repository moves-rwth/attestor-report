import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ASSComponent } from './ass.component';

const routes: Routes = [
    { path: '', component: ASSComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ASSRoutingModule { }
