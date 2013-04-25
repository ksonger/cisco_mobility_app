window.FooterView = Backbone.View.extend({
	initialize:function (options) {
		this.render()
	},
	respond:function() {
        this.$el.css({"width":app.windowWidth, "height":"74px", "top":app.windowHeight - 74 + "px"});
	},
	render:function() {
        this.$el = $("#footer");
		this.template = _.template(tpl.get("footer"));
		this.$el.html(this.template());
        this.$el.appendTo(app.mainView.$el);
        this.respond();
	}
});