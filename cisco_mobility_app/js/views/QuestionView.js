window.QuestionView = Backbone.View.extend({

	initialize:function (options) {

	},
	respond:function() {

	},
	render:function() {
		this.template = _.template(tpl.get("question"));
		this.$el.html(this.template({question:this.model, count:app.mainView.questionsAnswered+1}));
        var question = this;
        var main = app.mainView;
        $.each(question.$el.find("input"), function(index, ans)    {
            $(ans).click(function()    {
                var sel_ans = $(this);
                $.each(app.mainView.currentQuestionObj.answers, function(index, ans)    {
                    if(ans.id == sel_ans.attr("id"))    {
                        var responseObj = {question:main.currentQuestionObj, answer:ans};
                        main.currentResponseObj = responseObj;
                        main.nextId = ans.next_id;
                        TweenMax.to(main.questionsView.$el.find("#question_next"), .4, {css:{autoAlpha:1}});
                    }
                });     
            });
        });
	}
});