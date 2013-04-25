var StateView = function (options) {
	Backbone.View.apply(this, [options]);
};

_.extend(StateView.prototype, Backbone.View.prototype, {
	firstLoad:true,
    appended:false,
	currentLayout:"landscape",
	responding:false,

	onEnter:function() {
		TweenLite.to(this.$el, .7, {css:{autoAlpha:1}, delay:.4});   
	},
	onExit:function() {
	},
	respondLayout:function(layout) {

	},
	onFirstLoad:function() {
		this.firstLoad = false;
		this.render();
        this.$el.addClass("state");
		if(!this.appended)    {
            this.appended = true;
            this.$el.appendTo(app.mainView.$el);
        }
		TweenLite.to(this.$el, .01, {css:{autoAlpha:0}});
	}
});

StateView.extend = Backbone.View.extend;