function init() {
	loadTemplates();
}

var loadTemplates = function()  {
    tpl.loadTemplates(['main'], function () {
        app = new AppRouter();
        Backbone.history.start();
    });
}

init();
