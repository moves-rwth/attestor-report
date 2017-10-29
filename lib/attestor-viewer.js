
$(function(){

  var layoutPadding = 150;
  var hcLayoutPadding = 50;
  var aniDur = 500;
  var easing = 'linear';

  var cy;
  var cy2;

  // get exported json from cytoscape desktop via ajax
  var graphP = $.ajax({
    url: './data/statespace.json',
    type: 'GET',
    dataType: 'json'
  });

  // also get style via ajax
  var styleP = $.ajax({
    url: './lib/style.cycss', 
    type: 'GET',
    dataType: 'text'
  });
  
  var styleHc = $.ajax({
    url: './lib/styleHc.cycss', 
    type: 'GET',
    dataType: 'text'
  });

  var infoTemplate = Handlebars.compile([
    '<p class="ac-name"><i>ID:</i> {{id}}</p>',
    '<p class="ac-node-type"><i>Type:</i> {{type}}</p>',
    '<p class="ac-node-type"><i>Program statement:</i><br/>{{statement}}</p><br/>',
    '<p class="ac-node-type"><i>Atomic propositions:</i></p>',
    '{{#each propositions}}<p class="ac-node-type"><i class="fa fa-info-circle"></i> {{ this }}</p>{{/each}}<br/>',
    '<p class="ac-more"><i class="fa fa-external-link"></i> <a target="_blank" href="https://duckduckgo.com/?q={{name}}">More information</a></p>'
  ].join(''));

  // when both graph export json and style loaded, init cy
  Promise.all([ graphP, styleP ]).then(initCy);

  var allNodes = null;
  var allEles = null;
  var lastHighlighted = null;
  var lastUnhighlighted = null;



  // TODO
  var loadHeap = function( id ) {
    

        var graphHc = $.ajax({
            url: './data/hc_' + id + '.json',
            type: 'GET',
            dataType: 'json'
        });

        if(cy2) {
            cy2.destroy();
        }
  
        Promise.all([ graphHc, styleHc ]).then(initHeap);

  }

  var initHeap = function( then ) {
    
        var expJson = then[0];
        var styleJson = then[1];
        var elements = expJson.elements;

        cy2 = cytoscape({
            container: document.getElementById('cy2'),
            layout: { 
                name: 'dagre', 
                padding: layoutPadding,
                rankDir: 'TB',
                nodeSep: 50
            },
            style: styleJson,
            elements: elements, 
            selectionType: 'single',
            boxSelectionEnabled: false,
            autoungrabify: false ,
            zoom: 1
        });

        cy2.cxtmenu({
            selector: 'node, edge',
            commands: [
                {
                    content: '<span class="fa fa-expand fa-2x"></span>', // Reset
                    select: function(ele){
                        cy2.stop();
                        cy2.animation({
                            fit: {
                                eles: cy2.elements(),
                                padding: hcLayoutPadding
                            },
                            duration: 0,
                            easing: easing
                        }).play();
                    }
                },{
                    content: '<span class="fa fa-refresh fa-2x"></span>', // Show all',
                    select: function(ele){
                        var allElements = cy2.elements();
                        cy2.elements().forEach(function( e ){
                            e.show();
                        });
                    },
                },{
                    content: '<span class="fa fa-eraser fa-2x"></span>', // Hide',
                    select: function(ele){
                        var e = cy2.getElementById( ele.id() );
                        e.hide();
                    }
                }
            ]
        });

  }
  
  function getFadePromise( ele, opacity ){
    return ele.animation({
      style: { 'opacity': opacity },
      duration: aniDur
    }).play().promise();
  };
  

  
  function highlight( node ){
    var oldNhood = lastHighlighted;

    var essentialStatesOnly = $('#essentialStatesOnly').is(':checked');    
    if(!essentialStatesOnly) {
        var transitiveEdges = cy.edges().filter('[type = "transitive"]').remove();
    }
    
    var nhood = lastHighlighted = node.closedNeighborhood();
    var others = lastUnhighlighted = cy.elements().not( nhood );

    if(!essentialStatesOnly) {
        transitiveEdges.restore();
    }
    
    var reset = function(){
      cy.batch(function(){
        others.addClass('hidden');
        nhood.removeClass('hidden');

        allEles.removeClass('faded highlighted');

        nhood.addClass('highlighted');
      });

      return Promise.resolve().then(function(){
        if( isDirty() ){
          return fit();
        } else {
          return Promise.resolve();
        };
      }).then(function(){
        return Promise.delay( aniDur );
      });
    };

    var runLayout = function(){

      var l = nhood.filter(':visible').makeLayout({
        name: 'dagre',
        rankDir: 'LR',
        animate: true,
        animationDuration: aniDur,
        animationEasing: easing,
        padding: layoutPadding
      });

      var promise = cy.promiseOn('layoutstop');

      l.run();

      return promise;
    };

    var fit = function(){
      return cy.animation({
        fit: {
          eles: nhood.filter(':visible'),
          padding: layoutPadding
        },
        easing: easing,
        duration: aniDur
      }).play().promise();
    };

    return Promise.resolve()
      .then( reset )
      .then( runLayout )
      .then( fit )
    ;

  }
  

  
  function isDirty(){
    return lastHighlighted != null;
  }
  

  
  function clear( opts ){
    if( !isDirty() ){ return Promise.resolve(); }

    opts = $.extend({

    }, opts);

    cy.stop();
    allNodes.stop();

    var nhood = lastHighlighted;
    var others = lastUnhighlighted;

    lastHighlighted = lastUnhighlighted = null;

    var hideOthers = function(){
      return Promise.delay( 125 ).then(function(){
        others.addClass('hidden');

        return Promise.delay( 125 );
      });
    };

    var showOthers = function(){
      cy.batch(function(){
        allEles.removeClass('hidden').removeClass('faded');
      });

      return Promise.delay( aniDur );
    };

    var resetHighlight = function(){
      nhood.removeClass('highlighted');
    };

    return Promise.resolve()
      .then( resetHighlight )
      .then( hideOthers )
      .then( showOthers )
    ;
  }
  

  
  function showNodeInfo( node ){
    $('#info').html( infoTemplate( node.data() ) ).show();
  }

  function hideNodeInfo(){
    $('#info').hide();
  }
  
  
    function resetLayout() {
      var reset = function(){

      return Promise.resolve().then(function(){
        if( isDirty() ){
          return fit();
        } else {
          return Promise.resolve();
        };
      }).then(function(){
        return Promise.delay( aniDur );
      });
    };
    
   var runLayout = function(){

      var l = cy.elements().filter(':visible').makeLayout({
        name: 'dagre',
        rankDir: 'LR',
        animate: true,
        animationDuration: aniDur,
        animationEasing: easing,
        padding: layoutPadding,
      });

      var promise = cy.promiseOn('layoutstop');

      l.run();

      return promise;
    };

    var fit = function(){
      return cy.animation({
        fit: {
          eles: allNodes,
          padding: layoutPadding
        },
        easing: easing,
        duration: aniDur
      }).play().promise();
    };

    return Promise.resolve()
      .then( reset )
      .then( runLayout )
      .then( fit )
    ;
  }  
  

  function initCy( then ){
    var loading = document.getElementById('loading');
    var expJson = then[0];
    var styleJson = then[1];
    var elements = expJson.elements;

    loading.classList.add('loaded');

    cy = window.cy = cytoscape({
      container: document.getElementById('cy'),
      layout: { 
          name: 'dagre', 
          padding: layoutPadding,
          rankDir: 'LR',
      },
      style: styleJson,
      elements: elements,
      motionBlur: true,
      selectionType: 'single',
      boxSelectionEnabled: false,
      autoungrabify: true
    });

    allNodes = cy.nodes();
    
    allEles = cy.elements();
    
    cy.edges().forEach(function( e ) {
        var type = e.data('type');
        if(type == 'transitive') {
            e.hide();
        }
    });
    resetLayout();

    
    cy.on('tap', function(){
      $('#search').blur();
    });
    

    
    
    cy.on('select unselect', 'node', _.debounce( function(e){
      var node = cy.$('node:selected');

      if( node.nonempty() ){
        showNodeInfo( node );

        loadHeap( node.data('id') );

        var focusState = $('#focusState').is(':checked');
        if(focusState) {
            Promise.resolve().then(function(){
                return highlight( node );
            });
        }
      } else {
        hideNodeInfo();
        if( isDirty() ){
            clear();
        } 
        resetLayout();
      }

    }, 100 ) );
    

  }

  var lastSearch = '';

  
  $('#search').typeahead({
    minLength: 1,
    highlight: true,
  },
  {
    name: 'search-dataset',
    source: function( query, cb ){
      function matches( str, q ){
        str = (str || '').toLowerCase();
        q = (q || '').toLowerCase();

        return str.match( q );
      }

      var fields = ['type', 'id', 'statement', 'propositons'];

      function anyFieldMatches( n ){
        for( var i = 0; i < fields.length; i++ ){
          var f = fields[i];

          if( matches( n.data(f), query ) ){
            return true;
          }
        }

        return false;
      }

      function getData(n){
        var data = n.data();

        return data;
      }

      function sortById(n1, n2){
        if( n1.data('id') < n2.data('id') ){
          return -1;
        } else if( n1.data('id') > n2.data('id') ){
          return 1;
        }

        return 0;
      }

      var res = allNodes.stdFilter( anyFieldMatches ).sort( sortById ).map( getData );

      cb( res );
    },
    templates: {
      suggestion: infoTemplate
    }
  }).on('typeahead:selected', function(e, entry, dataset){
    var n = cy.getElementById(entry.id);

    cy.batch(function(){
      allNodes.unselect();

      n.select();
    });

    showNodeInfo( n );
  }).on('keydown keypress keyup change', _.debounce(function(e){
    var thisSearch = $('#search').val();

    if( thisSearch !== lastSearch ){
      $('.tt-dropdown-menu').scrollTop(0);

      lastSearch = thisSearch;
    }
  }, 50));

  
  $('#reset').on('click', function(){
    if( isDirty() ){
      clear();
    } else {
      resetLayout();
    }
  });
  

  
  $('#filters').on('click', 'input', function(){
    var finalStates = $('#finalStates').is(':checked');
    var initialStates = $('#initialStates').is(':checked');
    var mergeStates = $('#mergeStates').is(':checked');
    var otherStates = $('#otherStates').is(':checked');
    var essentialStatesOnly = $('#essentialStatesOnly').is(':checked');

    cy.batch(function(){

      allNodes.forEach(function( n ){
        var essential = n.data('essential');
        n.removeClass('filtered');
        var filter = function(){
          n.addClass('filtered');
        };
        if( !essential ) {
            if( essentialStatesOnly ) { filter(); }
        }

      });
      
      cy.edges().forEach(function( e ) {
          
          var type = e.data('type');
          if(essentialStatesOnly) {
                if(type != 'transitive') {
                   e.hide();
                } else {
                   e.show();
                }
          } else {
                if(type != 'transitive') {
                   e.show();
                } else {
                   e.hide();
                }
          }
      });
      

    });
    
   resetLayout();
    
  });
  
  
  

  
  $('#filter').qtip({
    position: {
      my: 'top center',
      at: 'bottom center',
      adjust: {
        method: 'shift'
      },
      viewport: true
    },

    show: {
      event: 'click'
    },

    hide: {
      event: 'unfocus'
    },

    style: {
      classes: 'qtip-bootstrap qtip-filters',
      tip: {
        width: 16,
        height: 8
      }
    },

    content: $('#filters')
  });
  

  
  $('#about').qtip({
    position: {
      my: 'bottom center',
      at: 'top center',
      adjust: {
        method: 'shift'
      },
      viewport: true
    },

    show: {
      event: 'click'
    },

    hide: {
      event: 'unfocus'
    },

    style: {
      classes: 'qtip-bootstrap qtip-about',
      tip: {
        width: 16,
        height: 8
      }
    },

    content: $('#about-content')
  });

});
