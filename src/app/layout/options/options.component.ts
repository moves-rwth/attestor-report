import { Component, OnInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import "rxjs/add/operator/takeWhile";

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.scss'],
    animations: [routerTransition()]
})
export class OptionsComponent implements OnInit {

    alive : boolean;

    booleanOptions : Array<any> = new Array();

    otherOptions : Array<any> = new Array();

    constructor(private http:Http) {
      this.alive = true;

      this.readOptionsJSONFile().subscribe(result => {
        //this.options = result;

        // Partition into boolean and other option values
        for(let option of result){
          switch(option.value){
            case 'true':{
              this.booleanOptions.push(option);
              break;
            }
            case 'false':{
              this.booleanOptions.push(option);
              break;
            }

            default: {
              this.otherOptions.push(option);
              break;
            }
          }
        }

      });

    }

    readOptionsJSONFile(){
      // get all (displayed) options together with its values (even if default)
          return this.http.get('assets/attestorInput/options.json')//, options)
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


    ngOnInit() {
    }

    ngOnDestroy() {
      this.alive = false;
    }
}
