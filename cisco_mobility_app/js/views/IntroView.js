window.IntroView = StateView.extend({

	initialize:function (options) {
		if (this.firstLoad) {
			this.onFirstLoad();
		}
	},
	respond:function() {
        this.$el.find("#intro_background").css({"width":app.windowWidth, "height":app.windowHeight});
	},
	render:function() {
		this.template = _.template(tpl.get("intro"));
		this.$el.html(this.template());
        this.$el.find("#begin_button").click(function()    {
            app.setState(app.mainView.questionsView);
        });
	}
});