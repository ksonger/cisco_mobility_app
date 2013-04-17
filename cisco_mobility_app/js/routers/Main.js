var app;

var AppRouter = Backbone.Router.extend({
	routes:{
        "":"index"
    },
    index:function () {
        app.mainModel = new MainModel();
        this.mainView = new MainView({model:app.mainModel});
    },
});