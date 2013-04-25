var db_host = "./";

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	tpl.loadTemplates([
		'intro',
		'question',
		'questions',
		'header',
		'footer',
		'median',
		'summary'   
	], function () {
		app = new AppRouter();
		Backbone.history.start();
	});
	navigator.splashscreen.hide();
}