import { Injectable } from '@angular/core';

@Injectable()
export class TooltipService {

  //private optionTooltips: { [optionName: string] : string } = {};

  optionTooltips = new Map<string, string>();

  constructor(){
    // Provide the option tooltips
    this.optionTooltips.set('aggressiveNullAbstraction', 'Abstract the neighbourhood of null regardless of the abstraction distance.');
    this.optionTooltips.set('removeDeadVariables', 'Dead variables are automatically removed from the heap.');
    this.optionTooltips.set('garbageCollection', 'The state space generation performs garbage collection.');
    this.optionTooltips.set('stateSpacePostProcessing', 'Advanced collapsing of final states.');
    this.optionTooltips.set('mode', 'Options: normal and indexed (considering also the index of nonterminals)');
    this.optionTooltips.set('abstractionDistance', 'Size of the neighbourhood of each variable, that is not considered for abstraction.');
    this.optionTooltips.set('maximalStateSpace', 'Abort analysis after the number of states in the state space exceeds the specified value.');
    this.optionTooltips.set('maximalHeap', 'Abort analysis after the one state exceeds the specified value.');


  }

  public getOptionTooltip(optionName : string) : string {
    if( this.optionTooltips.has(optionName)){
          return this.optionTooltips.get(optionName);
    } else {
      return '';
    };
  }

}
