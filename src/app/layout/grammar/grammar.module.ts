import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }    from '@angular/http';

import { GrammarComponent } from './grammar.component';
import { GrammarRoutingModule } from './grammar-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        GrammarRoutingModule,
        PageHeaderModule,
        HttpModule
    ],
    declarations: [GrammarComponent]
})
export class GrammarModule { }
