define(['namespace', 'jquery', 'underscore', 'backbone','text!modules/search/searchView.html', 'jqueryTmpl'],
       function (ns, $, _, Backbone, searchViewTemplate) {
           'use strict';
           var searchView = Backbone.View.extend({
               initialize: function () {                   
                   this.template = _.template(searchViewTemplate);
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
                       page: ns.currentPage
                   });
                   window.location = "#list";

//                   var workLogList = new WorkLogCollection();
//                   var workLogsView = new WorkLogsView({ collection: workLogList });
//                   $.mobile.jqmNavigator.pushView(workLogsView);

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

           return searchView;



       })

