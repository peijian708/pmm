define(['namespace', 'jquery', 'underscore', 'backbone', 'model/workLog/workLogModel'],
       function (ns, $, _, Backbone, WorkLogModel) {
           var WorkLogs = Backbone.Collection.extend({
               model: WorkLogModel,
               page: 0,
               //url: "../api/WorkLog/GetWorkLogs/post"

               fetch: function (o) {
                   var self = this;
                   var tmpWorkLog;
                   var jqxhr = $.ajax({
                       url: ns.config.apiHost + "api/WorkLog/GetWorkLogs/post",
                       dataType: "json",
                       type: "post",
                       //async:false,
                       data: $.param(o.attributes),
                       beforeSend: function () { $.mobile.showPageLoadingMsg(); },
                       complete: function () { $.mobile.hidePageLoadingMsg(); },
                       success: function (data) {
                           ns.page = data.pages;

                           self.remove(self.models);
                           $.each(data.workLogDetails, function (i, item) {
                               tmpWorkLog = new WorkLogModel(this);
                               self.add(tmpWorkLog);
                           });
                           //console.log(self.length);
                           self.trigger("fetchCompleted:WorkLogs");

                           //self.reset(data.workLogDetails);
                           //window.location = "#list";
                       },
                       error: function () { alert("error"); }
                   });
               }
           })
           return WorkLogs;
       });


