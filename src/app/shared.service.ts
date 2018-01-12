import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  //private optionTooltips: { [optionName: string] : string } = {};

  formula : string;
  id : number;

  constructor(){
    this.formula = '';
    this.id = 0;
  }

  public setFormula(formulaID : number, formulaString : string) : void {
    this.formula = formulaString;
    this.id = formulaID;
  }

  public getFormulaString() : string {
    return this.formula;
  }

  public getFormulaID() : number {
    return this.id;
  }

}
