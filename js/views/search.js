window.SearchView = Backbone.View.extend({
    initialize: function () {
        this.template = _.template(tpl.get('search-page'));
    },
    render: function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        "click #btnSearch": "search"
    },
    search: function (e) {

        //e.preventDefault();
        //e.stopPropagation();
        //$.mobile.showPageLoadingMsg();
        //window.location = $(this).attr('href');

        //$.mobile.showPageLoadingMsg();

        this.model.set({
            CreateDateStart: $("#txtStartDate").val(),
            CreateDateEnd: $("#txtEndDate").val(),
            page: workLogObj.currentPage
        });
        workLogObj.workLogs.find(this.model);

        /*
        searchResults.fetch({ data: $.param(this.model.attributes), type: 'POST', success: function (d) {
            //toast(d.attributes.Message);
            //if (d.attributes.IsSuccess) {
            window.location = "#list";
            //}


        }
        });*/
    }
})