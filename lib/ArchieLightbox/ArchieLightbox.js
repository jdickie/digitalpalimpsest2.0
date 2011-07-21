/**
 * ArchieLightbox
 * 
 * Displays warnings generated by various objects
 * 
 * Custom Events:
 * displayWarning: 
 * 	-display a message to the user in a light box
 * 	-pass[0] is String Object text
 * 
 * Functions:
 * close: 
 * 	-Closes box once it is open
 */

 
 ArchieLightbox=Monomyth.Class.extend({
	init:function(loc){
	this.DOM=$("<div></div>");
	loc.append(this.DOM);
	this.DOM.attr("id",function(arr){
		return "ho"+arr;
	});
	
	
	this.backarea=$("<div></div>");
	this.DOM.append(this.backarea);
	this.backarea.attr("id",function(arr){
		return "dark"+arr;
	});
	this.backarea.addClass("dark");
	this.light=$("<div></div>");
	this.DOM.append(this.light);
	this.light.attr("id",function(arr){
		return "light" + arr;
	});
	this.light.addClass("light");
	this.closeButton=$("<span></span>");
	this.light.append(this.closeButton);
	this.closeButton.attr("id",function(arr){
		return "close"+arr;
	});
	this.closeButton.addClass("window_close");
	this.closeButton.text("Close");
	this.closeButton.bind("click",{obj:this},this.close);
	
	this.messagearea=$("<div></div>");
	this.light.append(this.messagearea);
	this.messagearea.attr("id",function(arr){
		return "ma"+arr;
	});
	this.messagearea.addClass("messagearea");
	
	
	this.message="";
	//this.displayWarning=YAHOO.util.CustomEvent("displayWarning");
	this.DOM.css("display","none");

	
	//YAHOO.util.Dom.setStyle(this.backarea,'display','none');
 },
 
 	close:function(e){
		var obj=e.data.obj;
		obj.DOM.css('display','none');
		//YAHOO.util.Dom.setStyle(obj.DOM,'display','none');
		//YAHOO.util.Dom.setStyle(this.backarea,'display','none');
	},
	setMessage:function(txt){
		this.message=txt;
		this.messagearea.empty();
		/*
if(this.messagearea.firstChild){
			while(this.messagearea.firstChild){
				this.messagearea.removeChild(this.messagearea.firstChild);
			}
		}
*/
		this.messagearea.text(this.message);
	},
	showBrowserWarning:function(){
		this.messagearea.empty();
		/*
if(this.messagearea.firstChild){
			while(this.messagearea.firstChild){
				this.messagearea.removeChild(this.messagearea.firstChild);
			}
		}
*/
		this.messagearea.text("Please note that this program works best on Mozilla Firefox 3.5 Internet Browser. If using another browser, most features may not show up or may not work properly.<br/><br/>Check for the most current release of Mozilla Firefox: ");
		
		el=$("<a href=\"http://www.mozilla.com/\">Here</a>");
		this.messagearea.append(el);
		this.DOM.css('display','block');
		
	}
 });