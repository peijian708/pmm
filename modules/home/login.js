define(['jquery', 'underscore', 'backbone', 'text!modules/home/loginView.html'],
	function ($, _, Backbone, loginViewTemplate, WorkLogsView, WorkLogCollection, Search) {
	    var loginView = Backbone.View.extend({
        
	        template: _.template(loginViewTemplate),
	        render: function (eventName) {
	            $(this.el).append(this.template(this.model.toJSON()));
	            return this;
	        },
	        events: {
	            "click #btnLogin": "btnLogin_clickHandler"
	        },
	        btnLogin_clickHandler: function (e) {
	            $.mobile.showPageLoadingMsg();
	            this.model.set({
	                username: $("#txtname").val(),
	                password: $("#txtpwd").val()
	            });
	            this.model.fetch({ data: $.param(this.model.attributes), type: 'POST', success: function (d) {
	                if (d.attributes.IsSuccess) {	                  
	                    window.location = "#list";	                  
	                } else {
	                    //toast(d.attributes.Message);
	                    $.mobile.hidePageLoadingMsg();
	                    navigator.notification.alert(d.attributes.Message, null, '提示');
	                }
	            },
	                error: function (error) {
	                    // Hiding message
	                    $.mobile.hidePageLoadingMsg();
	                    // Displaying alert that login went wrong
	                    navigator.notification.alert(error, null, '提示');
	                }
	            });
	        }
	    })
	    return loginView;
	});




