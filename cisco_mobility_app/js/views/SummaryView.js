window.SummaryView = StateView.extend({

	initialize:function (options) {
		if (this.firstLoad) {
			this.onFirstLoad();
		}
	},
	respond:function() {

	},
	render:function() {
		this.template = _.template(tpl.get("summary"));
		this.$el.html(this.template());
	}
});