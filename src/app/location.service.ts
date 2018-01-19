import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/from';

import 'rxjs/add/operator/toPromise';


import { Http, Response } from '@angular/http';

@Injectable()
export class LocationService {

  // Benchmark overview
  static readonly benchmarks = 'http://localhost:9200/benchmark';
  static readonly benchmarksAlt = 'benchmarks.json';

  // ID of currently chosen benchmark
  bid : number;
  bidRead : boolean = false;
  benchmarks : Array<any> = [];

  static readonly settings = '/attestorInput/settings.json';
  //static readonly analysisSummary = '/attestorOutput/analysisSummary.json';
  static readonly analysisSummary = 'http://localhost:9200/benchmark/summary?bid=';
  static readonly messagesLog = 'http://localhost:9200/benchmark/messages?bid=';
  //static readonly options = '/attestorInput/options.json';
  static readonly options = 'http://localhost:9200/benchmark/options?bid=';
  static readonly inputProgram = '/attestorInput/analysedClass.java';
  // Grammar
  static readonly grammar = '/grammarData/grammarExport.json';
  static readonly rules = '/grammarData/';
  // Initial Confs
  //static readonly initConfSummary = '/attestorInput/initialHCsSummary.json';
  static readonly initConfSummary = 'http://localhost:9200/benchmark/initialHCsSummary?bid=';
  static readonly initConf = '/attestorInput/initialHC';
  // State space
  static readonly statespace = '/stateSpaceData/statespace.json';
  static readonly heapconf = '/stateSpaceData/hc_';
  // Counterexample
  static readonly trace = '/attestorOutput/counterex';
  static readonly traceHC = '/attestorOutput/counterex';
  static readonly traceInputHC = '/concreteHC.json';

  // Cytoscape
  static readonly statespaceStyle = 'assets/cytoscapeStyle/style.cycss';
  static readonly heapConfStyle = 'assets/cytoscapeStyle/styleHc.cycss';

  alive : boolean = true;


  constructor(private http:Http){
    // Set the default benchmark id to one
    //this.bid = 1;



    /*this.readBenchmarkssJSON()
                            .subscribe(result => {
                                            console.log("Benchmarks: " + JSON.stringify(result));
                                            console.log("Set bid: " + result[0].id);
                                            this.benchmarks = result;
                                            this.setBid(result[0].id);
                                });*/
  }

/*console.log("Trying to read " + LocationService.benchmarks);
return this.http.get(LocationService.benchmarks)
    .takeWhile(() => this.alive)
    .map((response: Response) => {
        console.log("Successful reading " + LocationService.benchmarks + " "  + response.json());
        return response.json();
    }
)
}*/

 private handleError(error: any): Promise<any> {
 return Promise.reject(error.message || error);
 }

  public setBid(bid : number) : void {
    this.bid = bid;
  }

  public getBenchmarks(){
    return this.benchmarks;
  }

}
