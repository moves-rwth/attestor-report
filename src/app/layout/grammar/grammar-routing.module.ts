import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrammarComponent } from './grammar.component';

const routes: Routes = [
    { path: '', component: GrammarComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GrammarRoutingModule { }
