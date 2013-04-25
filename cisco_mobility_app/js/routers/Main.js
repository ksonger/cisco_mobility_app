Backbone.View.prototype.close = function () {
	console.log('Closing view ' + app);
	if (app.beforeClose) {
		app.beforeClose();
	}
	app.remove();
	app.unbind();
};

var app;

var AppRouter = Backbone.Router.extend({

	initialize:function () {

	},
	mainCollection:null,
	mainView:null,
	currentLayout:"landscape",
	isIE10Touch:false,
	isTouchDevice:false,
	windowWidth:null,
	windowHeight:null,
	loader:null,
	currentState:null,
	routes:{
		"":"index"
	},
    
    
	index:function () {
		app.begin();
	},
	setState:function(state) {
		if (state != app.currentState) {
			if (app.currentState != null) {
				app.currentState.onExit();
				TweenMax.to(app.currentState.$el, .4, {css:{autoAlpha:0}});
			}
			app.currentState = state;
			app.currentState.onEnter();
		}
	},
	begin:function (callback) {
		var windowWidth;
		var windowHeight;
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			windowWidth = window.innerWidth;
			windowHeight = window.innerHeight;
		}
		else {
			windowWidth = $(window).width();
			windowHeight = $(window).height();
		}

		if (windowWidth <= 1024) {
			app.currentLayout = "portrait";
		}
		else {
			app.currentLayout = "landscape";
		}
		app.initData();
	},

       
	initData:function(callback) {  
		this.mainCollection = new MainCollection();
		app.mainCollection.fetch({
			success:function () {
				app.onDataReady();
			}, error:function(e) {
				console.log(e);
			}
		});
	},
    
	onDataReady:function() {
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			app.isTouchDevice = true;
		}
		if (navigator.platform.toLowerCase().indexOf("win") !== -1 && navigator.userAgent.toLowerCase().indexOf("touch") !== -1) {
			app.isIE10Touch = true;
		}
		// GET AVAILABLE DIMENSIONS
		if (this.isTouchDevice) {
			app.windowWidth = window.innerWidth;
			app.windowHeight = window.innerHeight;
		}
		else {
			app.windowWidth = $(window).width();
			app.windowHeight = $(window).height();
		}

		app.mainView = new MainView();
		app.mainView.render(); 
	}
});

$(window).resize(function() {
});