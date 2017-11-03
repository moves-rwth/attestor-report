import { Component, OnInit, ElementRef } from '@angular/core';
import * as cytoscape from 'cytoscape';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
            //const fragment = document.createRange().createContextualFragment('<script src="lib/attestor-grammar.js"></script>');
            //document.body.appendChild(fragment);
    }

    render(){

      let elem:HTMLElement = document.getElementById("cy")
            // Load style
      console.log(elem);

                // Load rule data and display rule graph
                let ruleData1 : any = { "nodes": [{"data": {"id": "a", "label": "Gene1"}},{"data": {"id": "b", "label": "Gene2"}}],"edges": [{"data": {"id": "ab","source": "a", "target": "b"}}]};
                let styleData : any = 'node { background-color: red; }';

                // Render rule
                cytoscape({
                    container : elem,
                    elements: ruleData1,
                    style: styleData
                });
      console.log("Cytoscape finished");
    }
}
