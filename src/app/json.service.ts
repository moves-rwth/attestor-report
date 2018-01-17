import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { LocationService } from './location.service'

@Injectable()
export class JsonService {

  alive : boolean;

  constructor(private http:Http, private locationService:LocationService){
    this.alive = true;
  }

  public readBenchmarksJSON(){
    return this.readJSON('assets/' + LocationService.benchmarks);
  }

  public readSettingsJSON(){
    return this.readJSON('assets/benchmark' + this.locationService.bid + LocationService.settings);
  }

  public readAnalysisSummaryJSON(){
    return this.readJSON('assets/benchmark' + this.locationService.bid + LocationService.analysisSummary);
  }

  readMessagesJSON(){
    return this.readJSON(LocationService.messagesLog + this.locationService.bid);
  }

  readGrammarJSON(){
    return this.readJSON('assets/benchmark' + this.locationService.bid + LocationService.grammar);
  }

  readRuleJSON(ntName : string, ruleIndex : number){
    return this.readJSON('assets' + LocationService.rules + ntName + 'Rule' + ruleIndex + '.json');
  }

  readInitialHCsSummaryJSON(){
    return this.readJSON('assets/benchmark' + this.locationService.bid + LocationService.initConfSummary);
  }

  readInitHCJSON(hcId : number){
    return this.readJSON('assets/benchmark' + this.locationService.bid + LocationService.initConf + hcId + '.json');
  }

  readOptionsJSON(){
    return this.readJSON('assets/benchmark' + this.locationService.bid + LocationService.options);
  }

  readInputProgram(){
    return this.http.get('assets/benchmark' + this.locationService.bid + LocationService.inputProgram)//, options)
        .takeWhile(() => this.alive)
    .catch(this.handleError);
  }

  readStatespaceJSON(){
    return this.readJSON('assets/benchmark' + this.locationService.bid + LocationService.statespace);
  }

  readHCJSON(id : any){
    return this.readJSON('assets/benchmark' + this.locationService.bid + LocationService.heapconf + id + '.json');
  }

  readStatespaceStyleJSON(){
    return this.http.get(LocationService.statespaceStyle);
  }

  readHeapConfStyleJSON(){
    return this.http.get(LocationService.heapConfStyle);
  }

  readTraceJSON(tid : number){
    return this.readJSON('assets/benchmark'+ this.locationService.bid + LocationService.trace + tid +'/trace.json');
  }

  readTraceHCJSON(tid : number, hcId : number){
    return this.readJSON('assets/benchmark'+ this.locationService.bid + LocationService.trace + tid + '/hc_' + hcId + '.json');
  }

  readTraceInputHCJSON(tid : number){
    return this.readJSON('assets/benchmark'+ this.locationService.bid + LocationService.trace + tid + LocationService.traceInputHC);
  }

  private readJSON(location : string){
    return this.http.get(location)
        .takeWhile(() => this.alive)
        .map((response: Response) => {
            console.log("Successful "  + response.json());
            return response.json();
        }
    )
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
  return Promise.reject(error.message || error);
  }

}
