window.HeaderView = Backbone.View.extend({
	initialize:function (options) {
		this.render()
	},
	respond:function() {
        this.$el.find("#header_background").css({"width":app.windowWidth, "height":"74px"});
	},
	render:function() {
        this.$el = $("#header");
		this.template = _.template(tpl.get("header"));
		this.$el.html(this.template());
        this.$el.appendTo(app.mainView.$el);
        this.respond();
	}
});