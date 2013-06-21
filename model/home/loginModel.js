define(["namespace", "backbone"], function (namespace, Backbone) {
    var Login = Backbone.Model.extend({
        url: namespace.config.apiHost+"api/Account/LogOnByAndPassword/post"
    })
    return Login;
})