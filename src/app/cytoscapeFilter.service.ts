import { Injectable } from '@angular/core';

@Injectable()
export class CytoscapeFilterService {

  constructor(){
  }

  public collapseChains(cy : any) {
    console.log('Collapsing chains in state space.');

        cy.nodes().forEach(function( n ){
            if( !n.data('essential') ){
              n.hide();
            }
          });

        cy.edges().forEach(function( e ) {
            if(e.data('type') != 'transitive') {
                       e.hide();
            } else {
                       e.show();
            }
          });
  }

  public removeFilters(cy : any) {
    console.log('Removing all filters from state space.');

    cy.nodes().show();

    cy.edges().forEach(function( e ) {
        if(e.data('type') != 'transitive') {
                   e.show();
        } else {
                   e.hide();
        }
    });

  }

}
