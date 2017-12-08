import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'input', loadChildren: './input/input.module#InputModule' },
            { path: 'grammar', loadChildren: './grammar/grammar.module#GrammarModule' },
            { path: 'program', loadChildren: './program/program.module#ProgramModule' },
            { path: 'init-conf', loadChildren: './init-conf/init-conf.module#InitConfModule' },
            { path: 'mc', loadChildren: './mc/mc.module#MCModule' },
            { path: 'options', loadChildren: './options/options.module#OptionsModule' },
            { path: 'verification-results', loadChildren: './verification-results/verification-results.module#VerificationResultsModule' },
            { path: 'ass', loadChildren: './ass/ass.module#ASSModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
