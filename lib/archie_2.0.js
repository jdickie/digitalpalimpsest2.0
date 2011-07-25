(function(MITHGrid, $, fluid) {
	/**
	* Creates presentation for viewing Text markup of a 
	* document
	*/
	MITHGrid.Presentation.TextView = function(container, options) {
		var that = MITHGrid.Presentation.initView("TextView", container, options),
		textLens = {
			render: function(container, view, model, pageId) {
				var that = {},el,item = model.getItem(pageId);
				el = $('<div class="archText">'+item.content[0]+'</div>');
				if(console) console.log('textview container render '+container);
				$(container).append(el);
				
				that.update = function(item) {};

	            that.remove = function() {
	                $(el).remove();
	            };
				
				return that;
			}
		};
		
		that.getLens = function(item) {
			if(console) console.log('textview getLens '+JSON.stringify(item));
			if(item.type[0] === "text"){
				return textLens;
			}
		};
		
		return that;
	};
	
	/*
	* Creates a presentation layor for viewing images
	* 
	*/
	MITHGrid.Presentation.ImageView = function(container, options) {
		var that = MITHGrid.Presentation.initView("ImageView", container, options),
		/*
		* Object that renders the HTML to view each image
		*/
		imageLens = {
			render: function(container, view, model, pageId) {
				var that = {},
				el, image = model.getItem(pageId);
				
				
				// create image element to view the image
				//  could insert OpenLayers object here, too
				el = $('<img id="'+image.id[0]+'" src="'+image.content[0]+'"/>');
				$(container).append(el);
				
				// determine height and width of the image and adjust
				var cw = $(container).width(), ch = $(container).height();
				var iw = el[0].width, ih = el[0].height;
				while((cw < iw) || (ch < ih)) {
					iw *= 0.9;
					ih *= 0.9;
				}
				
				el[0].width = iw;
				el[0].height = ih;
				
				
				that.update = function(item) {};

	            that.remove = function() {
	                $(el).remove();
	            };
				return that;
			}
		};
		
		that.getLens = function(item) {
			if(item.type[0] === 'image'){
				return imageLens;
			}
		};
		
		return that;
	};
	
	
	/*
	* ViewPanel
	* Application Layer for creating individual panels
	* Use the Image and Text view lenses
	*/
	MITHGrid.Application.ViewPanel = function(container, options) {
		var that = MITHGrid.Application.initApp("MITHGrid.Application.ViewPanel", container, {
			// data sources come from variety of sources - may want to optimize this via 
			// user input
			dataSources: [{
				label: 'content',
				// other items related to this one that should be culled from DB
				types: [{
					label: 'text'
				}, {
					label: 'image'
				}],
				// all items have an object relating to its content (MIME, text CDATA)
				properties: [
				// a marker to place where it is in the document
				{
					label: 'marker',
					valueType: 'Item'
				}]
			}],
			/*
			* DataViews for viewing text and Images 
			* Text and Image need to follow one another 
			*/
			dataViews: [{
				// lists pages in this document
				label: 'pages',
				dataSource: 'content',
				// collection provides filter, makes sure that marker is type
				// page and sends back page ID
				collection: function(model, id) {					
					var item = model.getItem(id);
					if(item.type === undefined) {
						return false;
					} else if(item.type[0] === 'image' && item.marker[0].type === 'page') {
						return;
					}
				}
			}],
			// DOM data to display on page load
			viewSetup: "<div id='"+$(".panel").size()+"_panel' class='panel'>"+
			"<div class='header'>"+
			"<div class='info'><a class='infoHeader'>Untitled</a><span class='panel_close'></span></div><div class='controls'></div>"+
			"</div>"+
			"<div class='body'>"+
			"<div class='textArea'></div>"+
			"<div class='imageArea'></div>"+
			"</div>"+
			"<div class='footer'></div>"+
			"</div>",
			/*
			* Tie together the text and image viewlenses to the appropriate textArea and imageArea elements
			*/
			presentations: [{
				type: MITHGrid.Presentation.TextView,
				container: "#"+$(".panel").size()+"_panel > .body > .textArea",
				dataView: 'pages',
				label: 'lines'
			},
			{
				type: MITHGrid.Presentation.ImageView,
				container: "#"+$(".panel").size()+"_panel > .body > .imageArea",
				dataView: 'pages',
				label: 'images' 
			}]
		}),
		selectors = {};
		/*
		* Called during construction of MITHGrid.Application.Panel
		*
		*/
		that.ready(function() {
			selectors.panel = "#"+$(".panel").size()+"_panel";
			selectors.header = "#"+$(".panel").size()+"_panel > .header";
			selectors.imageArea = "#"+$(".panel").size()+"_panel > .body > .imageArea";
			selectors.textArea = "#"+$(".panel").size()+"_panel > .body > .textArea";
			selectors.close = "#"+$(".panel").size()+"_panel > .header > .info > .panel_close";
		});
		
		that.ready(function() {
			$(selectors.close).click(function(e) {
				e.preventDefault();
				$("#"+$(".panel").length).remove();
			});
			
			$(selectors.imageArea).show();
			$(selectors.textArea).hide();
			
			$(selectors.panel).draggable({
				handle: selectors.header
			});
			
		});
		
		return that;
	};
	/*
	* MITHGrid.Application.Workspace
	* Creates new MITHGrid.Application.Panel objects
	*
	* 
	*/
	MITHGrid.Application.Workspace = function(container, options) {
		var that = MITHGrid.Application.initApp("MITHGrid.Application.Workspace", container, {
			dataSources: [{
				label: 'Workspace',
				/*
				* Contains panels that may or may not already be
				* created and loaded into Workspace
				*
				*/
				types: [{
					label: 'Panel'
				},{
					label: 'Toolbar'
				}]
			}],
			/*
			* Watches for any panels that open up
			* needs to control where panels are 
			*/
			dataViews: [{
				label: 'panels',
				collection: function(model, id) {
					var item = model.getItem(id);
					if(item.type === undefined){
						return false;
					} else if(item.type[0] === 'Panel') {
						return;
					}
				}
			}],
			/*
			* Need a toolbar to handle creating new panels
			*/
			viewSetup: "<div class='toolbar'><ul class='buttons'><li id='newpanel' class='toolbar_button'>New Panel</li></ul></div>",
			presentations: []
		}),
		selectors = {};
		// create element selectors
		that.ready(function() {
			selectors.newpanel = '#'+$(container).attr('id')+' > .toolbar > .buttons > #newpanel';
		});
		/*
		* Use selectors to attach callbacks 
		*
		*/
		that.ready(function() {
			$(selectors.newpanel).click(function(e) {
				var panel = {},
				data = [{
					label: 'image',
					type: 'image', 
					marker: {'type':'page','value':1},
					id:'image1', 
					content: 'http://archimedespalimpsest.net/Data/0000-100r/0000-100r_Arch53v_Heiberg_ultraviolet_stitch.jpg'
				},{
					label: 'text',
					type: 'text', 
					id:'text1',
					marker: {'type':'page','value':1}, 
					content: 'Text goes here.'
				}];
		
				panel = MITHGrid.Application.ViewPanel(container);
				panel.run();
				
				panel.dataSource.content.loadItems(data);
			});
		});
		
		
		return that;
	};
	
	
})(MITHGrid, jQuery, fluid);