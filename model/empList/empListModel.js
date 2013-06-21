define(["namespace", "backbone"], function (namespace, Backbone) {
    var EmpList = Backbone.Model.extend({
        url: namespace.config.apiHost + "api/WorkLog/GetEmpList/post"
    })
    return EmpList;
})