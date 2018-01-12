import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerificationResultsComponent } from './verification-results.component';

const routes: Routes = [
    { path: '', component: VerificationResultsComponent,
      children: [
        { path: 'counterex', loadChildren: './components/counterex/counterex.module#CounterexModule'}
      ]
   }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VerificationResultsRoutingModule { }
