window.MainView = Backbone.View.extend({

	initialize:function () {
	},
	initialized:false,
	introView:null,
	questionsView:null,
	medianView:null,
	summaryView:null,
    headerView:null,
    footerView:null,
    questionsAnswered:0,
	states:[],
    
    currentId:"UCM-K-C-01",
    nextId:null,
    questionsTotal:13,
    currentQuestionObj:null,
    currentResponseObj:null,
    responses:[],
      
	render:function () {
		this.$el = $("#main");	
		// if this is a touch-enabled device, set zoom levels
		if (app.isTouchDevice) {
			var viewportmeta = document.querySelector('meta[name="viewport"]');
			if (viewportmeta) {
				viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
				document.body.addEventListener('gesturestart', function () {
					viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
				}, false);
			}
		}
		var mainView = this;
		$(window).resize(function () {
			mainView.onWindowResize();
		});
        
		TweenLite.to(this.$el, .01, {css:{autoAlpha:0}});
		self.setTimeout("app.mainView.showMain()", 500);
		self.setInterval("app.mainView.onWindowResize()", 200);
		return this;
	},

	showMain:function () {
		if (!this.initialized) {
			app.mainView = this;
			this.initIntro();
			this.initQuestions(); 
			this.initSummary();
            this.initHeader();
            this.initFooter();
			this.initialized = true;
		}
	},
    
	initIntro:function () {
		this.introView = new IntroView();
		this.states.push(this.introView);
		TweenMax.to(this.$el, .7, {css:{autoAlpha:1}, delay:.4});
		app.setState(this.introView);
	},

	initQuestions:function () {
		this.questionsView = new QuestionsView();
		this.states.push(this.questionView);
	},
    
	initSummary:function () {
		this.summaryView = new SummaryView();
		this.states.push(this.summaryView);
	},
    initHeader:function () {
		this.headerView = new HeaderView();
		this.states.push(this.headerView);
	},
    initFooter:function () {
		this.footerView = new FooterView();
		this.states.push(this.footerView);
	},
    
	onWindowResize:function () {
		if (app.windowWidth < 1024) {
			app.currentLayout = "portrait";
		}
		else {
			app.currentLayout = "landscape";
		}
		try {
			$("#main").width(app.windowWidth);
			$("#main").height(app.windowHeight);
			app.currentState.respond();
		}
		catch (e) {
		}
        
        try {

			this.headerView.respond();
		}
		catch (e) {
		}
	}
});