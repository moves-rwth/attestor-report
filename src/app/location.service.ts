import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {

  // Benchmark overview
  static readonly benchmarks = 'benchmarks.json';

  // ID of currently chosen benchmark
  bid : number;

  static readonly settings = '/attestorInput/settings.json';
  static readonly analysisSummary = '/attestorOutput/analysisSummary.json';
  static readonly messagesLog = 'http://localhost:9200/benchmark?bid=';
  static readonly options = '/attestorInput/options.json';
  static readonly inputProgram = '/attestorInput/analysedClass.java';
  // Grammar
  static readonly grammar = '/grammarData/grammarExport.json';
  static readonly rules = '/grammarData/';
  // Initial Confs
  static readonly initConfSummary = '/attestorInput/initialHCsSummary.json';
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


  constructor(){
    // Set the default benchmark id to one
    this.bid = 1;
  }

}
