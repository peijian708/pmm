window.WorkLogListPage = Backbone.View.extend({
    initialize: function () {
        this.template = _.template(tpl.get('workloglist-page'));
        //this.model.bind("reset", this.render, this);
    },
    render: function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        this.listView = new WorkLogListView({ el: $('ul', this.el), model: this.model });
        this.listView.render();
        return this;
    },
    pagebeforecreate: function (e) {
        if (e.model.length > 0) {
            if (workLogObj.currentPage > 0 && workLogObj.currentPage < workLogObj.workLogs.page) {
                $("#next").show();
            } else {
                $("#next").hide();
            };
            if (workLogObj.currentPage > 1) {
                $("#previous").show();
            } else {
                $("#previous").hide();
            }
        }
    },
    events: {
        "click #next": "next",
        "click #previous": "previous",
        "click #btnDel": "openPopUp",
        "click #btnDelete": "deleteLog",
        "click #add": "add"
    },
    add: function () {
        window.location = "#add";
    },
    openPopUp: function (e) {
        e.preventDefault();
        $("#btnDelete").data("id", $(e.currentTarget).attr("data-bind"))
        $("#openPopUp-popup").attr("style", "max-width: 290px; top: 204.5px; left: 80px;");
        $('#openPopUp').show();
        $('#openPopUp').popup('open');
    },
    deleteLog: function (e) {
        var d = $("#btnDel").data("id").split("/");
        var $model = this.model;
        $.ajax({
            url: "../api/WorkLog/DeleteWorkLogs/post",
            type: "POST",
            dataType: 'json',
            data: { id: d[0], detailId: d[1] },
            //async: false,
            success: function (d) {
                if (d.IsSuccess) {
                    toast(d.Message);
                    $model.find(workLogObj.search);
                }
            }

        })
    },
    next: function (event) {
        workLogObj.currentPage++;
        workLogObj.search.set({
            page: workLogObj.currentPage
        });
        this.model.find(workLogObj.search);
        if (this.model.length > 0) {
            if (workLogObj.currentPage > 0 && workLogObj.currentPage <= workLogObj.workLogs.page) {
                $("#next").show();
            } else {
                $("#next").hide();
            };
            if (workLogObj.currentPage > 1) {
                $("#previous").show();
            } else {
                $("#previous").hide();
            }
        }
    },
    previous: function (event) {
        workLogObj.currentPage--;
        workLogObj.search.set({
            page: workLogObj.currentPage
        });
        this.model.find(workLogObj.search);
        if (this.model.length > 0) {
            if (workLogObj.currentPage > 0 && workLogObj.currentPage <= workLogObj.workLogs.page) {
                $("#next").show();
            } else {
                $("#next").hide();
            };
            if (workLogObj.currentPage > 1) {
                $("#previous").show();
            } else {
                $("#previous").hide();
            }
        }
    }
})

window.WorkLogListView = Backbone.View.extend({

    initialize: function () {
        //this.template = _.template(tpl.get('popup'));
        this.model.bind("reset", this.render, this);
    },

    render: function (eventName) {
        $(this.el).empty();
        //$('#welcome').remove();
        _.each(this.model.models, function (WorkLogModel) {
            $(this.el).append(new WorkLogListItemView({ model: WorkLogModel }).render().el);
        }, this);
        //$(this.el).append(this.template(this.model.toJSON()));
        $('#myList').listview('refresh');
        return this;
    }
});

window.WorkLogListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.template = _.template(tpl.get('worklogitem-page'));        
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});