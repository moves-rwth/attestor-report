import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TooltipService } from './tooltip.service';
import { SharedService } from './shared.service';
import { LocationService } from './location.service';
import { JsonService } from './json.service';
import { CytoscapeFilterService } from './cytoscapeFilter.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
    ],
    providers:[
      TooltipService,
      SharedService,
      LocationService,
      JsonService,
      CytoscapeFilterService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
