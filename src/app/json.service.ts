import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { LocationService } from './location.service'

import 'rxjs/add/operator/toPromise';
import "rxjs/add/operator/takeWhile";

@Injectable()
export class JsonService {

  alive : boolean;

  constructor(private http:Http, private locationService:LocationService){
    this.alive = true;
  }

  public readBenchmarksJSON(){
    return this.readJSON(LocationService.benchmarks);
    //return this.readJSON('assets/' + LocationService.benchmarks);
  }

  public readSettingsJSON(){
    //return this.readJSON('assets/benchmark' + this.locationService.bid + LocationService.settings);
    return this.readJSON(LocationService.settings + this.locationService.bid);
  }

  public readAnalysisSummaryJSON(){
    //return this.readJSON('assets/benchmark' + this.locationService.bid + LocationService.analysisSummary);
    return this.readJSON(LocationService.analysisSummary + this.locationService.bid);
  }

  readMessagesJSON(){
    return this.readJSON(LocationService.messagesLog + this.locationService.bid);
  }

  readGrammarJSON(){
    //return this.readJSON('assets/benchmark' + this.locationService.bid + LocationService.grammar);
    return this.readJSON(LocationService.grammar + this.locationService.bid);
  }

  readRuleJSON(ntName : string, ruleIndex : number){
    //return this.readJSON('assets' + LocationService.rules + ntName + 'Rule' + ruleIndex + '.json');
    return this.readJSON(LocationService.rules + this.locationService.bid + '&ntName=' + ntName + '&ruleID=' + ruleIndex);

  }

  readInitialHCsSummaryJSON(){
    //return this.readJSON('assets/benchmark' + this.locationService.bid + LocationService.initConfSummary);
    return this.readJSON(LocationService.initConfSummary + this.locationService.bid);
  }

  readInitHCJSON(hcId : number){
    //return this.readJSON('assets/benchmark' + this.locationService.bid + LocationService.initConf + hcId + '.json');
    return this.readJSON(LocationService.initConf + this.locationService.bid  + '&hcID=' + hcId);
  }

  readOptionsJSON(){
    //return this.readJSON('assets/benchmark' + this.locationService.bid + LocationService.options);
    return this.readJSON(LocationService.options + this.locationService.bid);
  }

  readInputProgram(){
    //return this.http.get('assets/benchmark' + this.locationService.bid + LocationService.inputProgram)//, options)
    return this.http.get(LocationService.inputProgram + this.locationService.bid)//, options)
        .takeWhile(() => this.alive)
    .catch(this.handleError);
  }

  readStatespaceJSON(){
    //return this.readJSON('assets/benchmark' + this.locationService.bid + LocationService.statespace);
    return this.readJSON(LocationService.statespace + this.locationService.bid);
  }

  readHCJSON(id : any){
    //return this.readJSON('assets/benchmark' + this.locationService.bid + LocationService.heapconf + id + '.json');
    return this.readJSON(LocationService.heapconf + this.locationService.bid + "&hcID=" + id);

  }

  readStatespaceStyleJSON(){
    return this.http.get(LocationService.statespaceStyle);
  }

  readHeapConfStyleJSON(){
    return this.http.get(LocationService.heapConfStyle);
  }

  readTraceJSON(tid : number){
    //return this.readJSON('assets/benchmark'+ this.locationService.bid + LocationService.trace + tid +'/trace.json');
    return this.readJSON(LocationService.trace + this.locationService.bid + '&cexID=' + tid);
  }

  readTraceHCJSON(tid : number, hcId : number){
    //return this.readJSON('assets/benchmark'+ this.locationService.bid + LocationService.trace + tid + '/hc_' + hcId + '.json');
    return this.readJSON(LocationService.trace + this.locationService.bid + '&cexID=' + tid + '&hcID=' + hcId);
  }

  readTraceInputHCJSON(tid : number){
    //return this.readJSON('assets/benchmark'+ this.locationService.bid + LocationService.trace + tid + LocationService.traceInputHC);
    return this.readJSON(LocationService.traceInputHC + this.locationService.bid + '&cexID=' + tid);

  }

  private readJSON(location : string){
    console.log("Trying to read " + location);
    return this.http.get(location)
        .takeWhile(() => this.alive)
        .map((response: Response) => {
            console.log("Successful reading " + location + " "  + response.json());
            return response.json();
        }
    )
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
  return Promise.reject(error.message || error);
  }

}
