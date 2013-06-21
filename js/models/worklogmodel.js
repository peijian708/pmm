window.WorkLogModel = Backbone.Model.extend({
    url: "../api/WorkLog/GetDetail/post"
})

window.WorkLogCollection = Backbone.Collection.extend({
    model: WorkLogModel,
    url: "../api/WorkLog/GetWorkLogs/post",
    page: 0,
    find: function (queryParamet) {


        
        

        var url = "../api/WorkLog/GetWorkLogs/post";
        var self = this;
        $.ajax({

            beforeSend: function () { $.mobile.showPageLoadingMsg(); },
            complete: function () { $.mobile.hidePageLoadingMsg(); },

            url: this.url,
            dataType: "json",
            type: "post",
            data: $.param(queryParamet.attributes),
            success: function (data) {
                self.page = data.pages;
                self.reset(data.workLogDetails);
                //workLogObj.workLogs.set(data.workLogDetails);
                window.location = "#list";
            }
        });
    }
})