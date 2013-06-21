define(['namespace', 'jquery', 'underscore', 'backbone', 'text!modules/workLogList/worklogsView.html', 'jqueryTmpl'],
       function (namespace, $, _, Backbone, worklogslistViewTemplate) {
           'use strict';
           var listView = Backbone.View.extend({
               events: {
                   'pagebeforecreate': 'pagebeforecreateHandler',
                   "click #next": "next",
                   "click #previous": "previous",
                   "click #btnSearch": "btnSearchHandler",
                   "click #btnDel": "btnDelHandler"
               },
               initialize: function () {
                   this.collection.bind('fetchCompleted:WorkLogs', this.wrapper, this);
               },
               render: function () {
                   this.$el.html(_.template(worklogslistViewTemplate));
                   this.collection.fetch(namespace.search);
                   /*
                   var c = this.collection;
                   var el = $(this.el);
                   var template = this.template;
                   this.collection.fetch({ data: $.param(search.attributes), type: 'POST', success: function (d) {
                   $.each(d.models[0].attributes.workLogDetails, function (i, item) {
                   //tmpWorkLog = new WorkLogModel(this);
                   c.add(new WorkLogModel(this));
                   });
                   el.append(template({ data: c.toJSON() }));
                   }
                   });*/
                   //this.trigger("renderCompleted:WorkLogs", this, "test parameter");                   
                   return this;
               },
               wrapper: function () {
                   var html = this.$el.find("#worklogListTemplate").render({ data: this.collection.toJSON() });
                   this.$el.find('#worklogList').empty();
                   this.$el.find('#worklogList').append(html).listview('refresh');
                   if (namespace.currentPage > 0 && namespace.currentPage < namespace.page) {
                       $("#next").show();
                   } else {
                       $("#next").hide();
                   };
                   if (namespace.currentPage > 1) {
                       $("#previous").show();
                   } else {
                       $("#previous").hide();
                   }

                   //$(this.el).append(this.template({ data: this.collection.toJSON() }));
               },
               pagebeforecreateHandler: function (e) {
                   //if (e.model.length > 0) {

                   //}
               },
               next: function (event) {
                   namespace.currentPage++;
                   namespace.search.set({
                       page: namespace.currentPage
                   });
                   this.collection.fetch(namespace.search);

               },
               previous: function (event) {
                   namespace.currentPage--;
                   namespace.search.set({
                       page: namespace.currentPage
                   });
                   this.collection.fetch(namespace.search);
               },
               btnSearchHandler: function () {
                   $.mobile.jqmNavigator.pushView(new SearchView({ model: namespace.search }));
               },
               btnDelHandler: function (e) {
                   var obj = e.currentTarget;
                   var d = $(obj).attr("data-bind").split("/");
                   var $collection = this.collection;
                   var del = function (button) {
                       if (button == 1) {
                           $.ajax({
                               url: namespace.config.apiHost + "api/WorkLog/DeleteWorkLogs/post",
                               type: "POST",
                               dataType: 'json',
                               data: { id: d[0], detailId: d[1] },
                               //async: false,
                               success: function (d) {
                                   if (d.IsSuccess) {
                                       //toast(d.Message);
                                       navigator.notification.alert(d.Message, '提示');
                                       //$model.find(workLogObj.search);
                                       $collection.fetch(namespace.search);
                                   }
                               }

                           })
                       }
                   };

                   navigator.notification.confirm("是否真的要删除日志", del, '提示', 'Yes,No');
                   





               }


           });

           return listView;
       });