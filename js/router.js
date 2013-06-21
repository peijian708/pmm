// Filename: js/router.js
// Author: peij

define(['namespace', 'jquery', 'underscore', 'backbone', 'modules/home/login',
'model/home/loginModel', 'modules/workLogList/worklogs', 'model/workLog/workLogCollection', 'modules/search/search', 'model/search/searchModel',
 'model/workLog/workLogModel', 'modules/workLog/worklog', 'jqm'],
	function (namespace, $, _, Backbone, LoginView, Login, WorkLogsView, WorkLogCollection, SearchView, Search, workLog, workLogView) {//	    
	    'use strict';

	    var App = namespace.app;
	    var Router = Backbone.Router.extend({
	        routes: {
	            "": "login",
	            "list": "list",
	            "search": "search",
	            "add": "add",
	            "worklogdetail/:id/:detailId": "worklogdetail",
	            "*actions": "defaultAction"
	        },

	        initialize: function () {

	            $('.back').live('click', function (event) {
	                window.history.back();
	                return false;
	            });
	            this.firstPage = true;


	        },
	        dialog: function () {
	            /*
	            $.mobile.changePage("#sGuidtWorkOrder-dialog",
	            {
	            transition: 'pop'
	            //role: 'dialog',
	            //changeHash: false
	            });*/
	        },
	        defaultAction: function (actions) {

	        },
	        login: function () {
	            var self = this;
	            var login = new Login({ username: "peij", password: "123" });
	            var loginView = new LoginView({ model: login })
	            $.mobile.jqmNavigator.pushView(loginView);

	            //loginView.render();
	            //self.changePage(loginView);
	        },

	        list: function () {
	            var self = this;
	            //var workLogListPage = workLogListPage || new WorkLogListPage({ model: workLogObj.workLogs });
	            //this.changePage(workLogListPage);
	            if (!namespace.search) {
	                namespace.search = new Search();
	            }

	            var workLogList = new WorkLogCollection();
	            var workLogsView = new WorkLogsView({ collection: workLogList });
	            $.mobile.jqmNavigator.replaceAll(workLogsView, { transition: 'slide' });
	            //self.changePage(workLogsView);

	            //workLogsView.bind('renderCompleted:WorkLogs', this.triggerChangeView, this);
	            //workLogList.fetch(search);

	        },

	        search: function () {
	            var self = this;
	            //var search = new SearchModel();
	            //        $.mobile.showPageLoadingMsg();
	            //        setTimeout($.mobile.showPageLoadingMsg, 5);

	            //workLogObj.search = new SearchModel();
	            //this.changePage(new SearchView({ model: workLogObj.search }));
	            $.mobile.jqmNavigator.replaceAll(new SearchView({ model: namespace.search }), { transition: 'slide' });
	            //self.changePage(new SearchView({ model: namespace.search }));
	        },
	        worklogdetail: function (id, detailId) {
	            var worklog = new workLog({ id: id, detailId: detailId });
	            var self = this;
	            worklog.fetch({ data: { id: id, detailId: detailId }, type: 'POST',
	                success: function (data) {
	                    $.mobile.jqmNavigator.replaceAll(new workLogView({ model: data }), { transition: 'slide' });
	                    //self.changePage(new workLogView({ model: data }))
	                }
	            });
	        },
	        add: function () {
	            var worklog = new workLog();
	            var self = this;
	            worklog.fetch({ data: { id: '', detailId: '' }, type: 'POST',
	                success: function (data) {
	                    //self.changePage(new WorklogView({ model: data }));
	                    $.mobile.jqmNavigator.replaceAll(new workLogView({ model: data }), { transition: 'slide' });

	                    //self.changePage(new workLogView({ model: data }));

	                }
	            });
	        }, /*
	        dellog: function (id, detailId) {
	        console.info(id + " " + detailId);
	        $('#openPopUp').popup('open');
	        },
	        */
	        //the parameter 'view' is transferred from trigger call
	        triggerChangeView: function (view, demoparm) {
	            $.mobile.jqmNavigator.replaceAll(view);
	        },
	        changePage: function (view) {
	            /*
	            $(page.el).attr('data-role', 'page').attr('data-theme', "b");


	            //	            $(page.el).live("pagebeforecreate", function () {
	            //	                if (typeof page.pagebeforecreateHandler == "function") {
	            //	                    page.pagebeforecreateHandler.call(null, page);
	            //	                }
	            //	            });


	            page.render();
	            //var pageContainer = $.mobile.pageContainer || this.defaultPageContainer || $('body');
	            //$(pageContainer).append($(page.el));
	            $('body').append($(page.el));

	            var transition = $.mobile.defaultPageTransition;


	            if (this.firstPage) {
	            transition = 'none';
	            this.firstPage = false;
	            }

	            console.info(transition);



	            $.mobile.changePage($(page.el), { changeHash: false, transition: transition });*/








	            console.log("changePage" + view.el);
	            //设定外层div容器的data-role为'page'，以支持jquery mobile
	            $(view.el).attr('data-role', 'page');
	            //插入dom
	            $('body').append($(view.el));
	            var transition = $.mobile.defaultPageTransition;

	            //如果不是第一个页面，那么调用enhance JQuery Mobile page,
	            //并且执行transition动画。
	            //如果是第一个页面，那么无需changePage。否则会出错。                

	            if (!this.firstPage) {
	                $.mobile.changePage($(view.el), { changeHash: false, transition: transition });
	            } else {
	                this.firstPage = false;
	            }






	        }
	    });

	    return Router;
	});