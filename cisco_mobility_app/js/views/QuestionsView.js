window.QuestionsView = StateView.extend({

	initialize:function (options) {
		if (this.firstLoad) {
			this.onFirstLoad();
		}
	},
	respond:function() {
		this.$el.find("#questions").css({"width":app.windowWidth + "px", "height":app.windowHeight + "px"}); 
		this.$el.find("#questions_footer").css({"width":app.windowWidth + "px", "height":"43px", "top":app.windowHeight - $("#footer").height() - this.$el.find("#questions").offset().top - 43 + "px"});
		this.$el.find("#question_image").css({
			"left":app.windowWidth - this.$el.find("#question_image").width() + "px", 
			"top":this.$el.offset().top + this.$el.find("#questions_header").height() + "px"
		});
		this.$el.find("#question_image").height(this.$el.find("#questions_footer").offset().top - this.$el.find("#questions").offset().top - this.$el.find("#questions_header").height());
		this.$el.find("#question_image").width(this.$el.find("#question_image").height());
		this.$el.find("#question_image").find("img").width(this.$el.find("#question_image").width());
		this.$el.find("#question_body").width(app.windowWidth - this.$el.find("#question_image").width() - 40);
		this.$el.find("#question_body").height(this.$el.find("#questions_footer").offset().top - this.$el.find("#questions").offset().top - this.$el.find("#questions_header").height());
        this.$el.find("#current_summary").height(this.$el.find("#question_body").height());
        this.$el.find("#continue_button").css({
			"top":app.windowHeight - $("#footer").height() - this.$el.find("#questions_footer").height() - 200 + "px"
		});
		this.$el.find("#question_next").css({
			"left":(this.$el.find("#question_body").width() / 2) - 60 + "px", 
			"top":this.$el.find("#question_body").height() + this.$el.find("#questions").offset().top - 70 + "px"
		});
        
		this.$el.find("#sections").css({
			"left":app.windowWidth - this.$el.find("#sections").width() - 20 + "px", 
			"top":"17px"
		});
        this.$el.find("#progress_track_middle").width(app.windowWidth - 84);
        if(this.$el.find("#progress_bar_middle").width() == 0)    {
            var range = this.$el.find("#progress_track_middle").width();
            var pct = 1/12;
            TweenMax.to(this.$el.find("#progress_bar_middle"), .4, {css:{width:(range*pct)}});
        }
        
	},
	render:function() {
		this.template = _.template(tpl.get("questions"));
		var questions = this;
		$.each(_.values(app.mainCollection.models[0].get("questions")), function(index, val) {
			if (val.id == app.mainView.currentId) {
				app.mainView.currentQuestionObj = val;
				questions.$el.html(questions.template());
				var ques = new QuestionView({model:val});
				ques.render();
				ques.$el.appendTo(questions.$el.find("#question_body"));
				TweenMax.to(questions.$el.find("#question_next"), .01, {css:{autoAlpha:0}});
			}
		});
        
		this.$el.find("#question_next").click(function() {
			app.mainView.responses.push(app.mainView.currentResponseObj);
			if (app.mainView.currentId.substr(6, 1) == "C" && app.mainView.nextId.substr(6,1) == "F") {
                app.mainView.currentId = app.mainView.nextId;
				app.mainView.questionsAnswered++;
				questions.showSummary(questions);
			}
			else {
				app.mainView.currentId = app.mainView.nextId;
				app.mainView.questionsAnswered++;
				TweenMax.to(questions.$el.find("#question_next"), .01, {css:{autoAlpha:0}});
				TweenMax.to(questions.$el.find("#question_body"), .2, {css:{autoAlpha:0}, onComplete:questions.showNextQuestion, onCompleteParams:[questions]});
			}
			TweenMax.to(questions.$el.find("#back_button"), .01, {css:{autoAlpha:0}});
		});
		this.$el.find("#back_button").click(function() {
			TweenMax.to(questions.$el.find("#question_next"), .01, {css:{autoAlpha:0}});
			TweenMax.to(questions.$el.find("#question_body"), .2, {css:{autoAlpha:0}, onComplete:questions.showPreviousQuestion, onCompleteParams:[questions]});
		});
        TweenMax.to(this.$el.find("#current_summary"), .01, {css:{autoAlpha:0}});
        questions.$el.find("#continue_button").click(function()    {         
            TweenMax.to(questions.$el.find("#current_summary"), .3, {css:{autoAlpha:0}});
            questions.showNextQuestion(questions);
        });
        
	},
	showNextQuestion:function(questions) {
		if (questions.$el.find("#back_button").css("opacity") == 0) {
			TweenMax.to(questions.$el.find("#back_button"), .3, {css:{autoAlpha:1}});
		}
		$.each(_.values(app.mainCollection.models[0].get("questions")), function(index, val) {
			if (val.id == app.mainView.currentId) { 
				app.mainView.currentQuestionObj = val;
				var ques = new QuestionView({model:val});
				ques.render();
				questions.$el.find("#question_body").html("");
				ques.$el.appendTo(questions.$el.find("#question_body"));
				TweenMax.to(questions.$el.find("#question_body"), .3, {css:{autoAlpha:1}});
                var range = questions.$el.find("#progress_track_middle").width();
                var pct = val.position/12;
                TweenMax.to(questions.$el.find("#progress_bar_middle"), .4, {css:{width:(range*pct)}});
			}
		});
        
	},
	showPreviousQuestion:function(questions) {
		app.mainView.questionsAnswered--;
		$.each(_.values(app.mainCollection.models[0].get("questions")), function(index, val) {
			if (val.id == app.mainView.responses[app.mainView.responses.length - 1].question.id) { 
				app.mainView.currentId = val.id;
				app.mainView.currentQuestionObj = val;
				var ques = new QuestionView({model:val});
				ques.render();
				questions.$el.find("#question_body").html("");
				ques.$el.appendTo(questions.$el.find("#question_body"));
				TweenMax.to(questions.$el.find("#question_body"), .3, {css:{autoAlpha:1}});
			}
		});
		app.mainView.responses.pop();
	},
    showSummary:function(questions)    {
        if (questions.$el.find("#back_button").css("opacity") == 0) {
			TweenMax.to(questions.$el.find("#back_button"), .3, {css:{autoAlpha:1}});
		}
        var responses = "";
        $.each(app.mainView.responses, function(index, response)    {
            
            var response = "<td>" + response.answer.text + "</td></tr>";
            responses = responses + response; 
        });
        
        document.getElementById("responses_table").innerHTML = responses;
        TweenMax.to(this.$el.find("#current_summary"), .5, {css:{autoAlpha:1}});
    }
});