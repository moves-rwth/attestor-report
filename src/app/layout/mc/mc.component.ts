import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import "rxjs/add/operator/takeWhile";

@Component({
    selector: 'app-mc',
    templateUrl: './mc.component.html',
    styleUrls: ['./mc.component.scss'],
    animations: [routerTransition()]
})
export class MCComponent implements OnInit {

    alive : boolean;

    formulae : Array<string>;

    constructor(private http:Http) {

      this.alive = true;


      // Get the input MC formulae from settings file
      this.readSettingsJSONFile().subscribe(result => {
        this.formulae = result.modelChecking.formulae.split(';');
      });

    }

    ngOnInit() {
    }

    readSettingsJSONFile(){
      // get the summary information of the initial HCs
          return this.http.get('assets/attestorInput/settings.json')//, options)
              .takeWhile(() => this.alive)
              .map((response: Response) => {
                  return response.json();
              }
          )
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
    }

    ngOnDestroy() {
      this.alive = false;
    }

}
