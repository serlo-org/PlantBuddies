function Input(){

	var input;

    this.init = function(){

    	input = $('#plant-input');

    	setupTypeahead();
    	initSelectEvent();
    	initEnterEvent();
    	initOnDelete();
    	initActiveEvent();
    }

    var setupTypeahead = function(){
		input.typeahead({
			hint: true,
			highlight: true,
			minLength: 0
		},{
			name: 'gPlantData',
			display: buildDisplayString,
			limit:200,
			source: substringMatcher(),
			templates: {
				empty: [
				'<div class="empty-message">',
					'unable to match the current query',
				'</div>'
				].join('\n'),
				suggestion: function(obj){
					
					if (gLanguage.active === 'en' ) {	
						if(!obj.alt) obj.alt = '';
						return ("<div>"+obj.name+" <span class='gray'>"+obj.alt+"</span></div>");
					}
					if (gLanguage.active === 'de' ) {	
						if(!obj.alt_de) obj.alt_de = '';
						return ("<div>"+obj.name_de+" <span class='gray'>"+obj.alt_de+"</span></div>");
					}

				}
			}
		});
    } //setupTypeahead

    var initSelectEvent = function(){
		input.on('typeahead:select typeahead:autocomplete', function(e, suggestion) {
			gEvents.updateHash(suggestion.id);
			gPlants.load(suggestion);

			// _paq.push(['trackEvent', 'InputSuccess', 'selected: '+suggestion.id ]);
		});
    } //initSelectEvent

    var initActiveEvent = function(){ //mark all on click
    	input.on('typeahead:active', function(e){
    		input.select();
    	});
    }

	var substringMatcher = function() {

		return function findMatches(q, cb) {
	    	var matches, substrRegex;
	    	matches = [];
	    	substrRegex = new RegExp(q, 'i');

	    for (var i = 0, len = gPlantData.length; i < len; i++) {
	    	
	    	var id = gPlantData[i].id;

	    	if (gLanguage.active === 'en' ){
	    		var name = gPlantData[i].name;	
	    		var altName = gPlantData[i].alt;
	    		if( !plantReady(id,gPlantData[i].note) ) continue;
	    	} 
	    	if (gLanguage.active === 'de' ){
	    		var name = gPlantData[i].name_de;	
	    		var altName = gPlantData[i].alt_de;
	    		if( !plantReady(id,gPlantData[i].note_de) ) continue;
	    	} 

			if (substrRegex.test(name) || substrRegex.test(altName)) {
				matches.push( gPlantData[i] );
			}
		}
	    cb(matches);
	  };
	} //substringMatcher

	var buildDisplayString = function(suggestion){
		// if(!suggestion.alt) suggestion.alt = '';
		if (gLanguage.active === 'en' ) return suggestion.name;
		if (gLanguage.active === 'de' ) return suggestion.name_de;
	}

	var initEnterEvent = function() {

		//hack to get autocomplete on enter
		$(document).on('keypress', '#plant-input', function(e) {
	        if(e.keyCode == 13) {            
	            e.preventDefault();
				var selectables = input.siblings(".tt-menu").find(".tt-selectable");
		        if (selectables.length > 0) $(selectables[0]).trigger('click');
	        }
    	});

	} //initEnterEvent

	var initOnDelete = function(){
		input.on("keyup cut", function() {
		   if(input.typeahead('val') === '') gEvents.loadStartPage();
		});
	} // initOnDelete

	this.clearInput = function(){
		input.typeahead('val','');
	}

}//Input