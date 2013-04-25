window.MainCollection = Backbone.Collection.extend({
    model:MainModel,
    url:db_host + "js/json/data.json"
});