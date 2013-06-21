define(["namespace", 'backbone', ], function (namespace, Backbone) {
    var WorkLogModel = Backbone.Model.extend({
        url: namespace.config.apiHost + "api/WorkLog/GetDetail/post"
    })
    return WorkLogModel;
})



