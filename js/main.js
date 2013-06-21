// Filename: js/main.js
// Author: peij
require.config({
    //urlArgs: "timer=" + (new Date()).getTime(),
    deps: ["main"],
    paths: {
        text: 'vendor/require/text.min',
        domReady: 'vendor/require/domReady.min',
        jquery: 'vendor/jqm/jquery-1.8.3.min',
        underscore: 'vendor/underscore/underscore-min',
        backbone: 'vendor/backbone/backbone-min',
        jqueryTmpl: "vendor/jqm/jsrender.min",
        handlebars:"handlebars/handlebars",
        jqm: 'vendor/jqm/jquery.mobile-1.3.0.min',
        jqmNavigator: 'vendor/jqm/jqmNavigator',
        jqueryvalidate: 'plugin/jquery.validate.min',
        jqmdatebox: 'plugin/jqm-datebox.core',
        jqmdateboxmode: 'plugin/jqm-datebox.mode.calbox.min',
        jqmdateboxil8n: 'plugin/jquery.mobile.datebox.i18n.zh-CN.utf8',
        lib: 'plugin/lib',
        plugin: 'plugin',
        modules: '../modules',
        model: '../model'
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        jqm: {
            deps: ['jquery', 'jqmNavigator']//'jqm-config', 
        },
        jqueryTmpl: {
            deps: ['jquery']
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        jqueryvalidate: {
            deps: ["jquery", 'jqmdatebox', 'jqmdateboxmode', 'jqmdateboxil8n']//,
            //exports: "jquery.validation"
        },
        lib: {
            deps: ['jquery']
        },
        jqmdatebox: {
            deps: ["jquery"]
        },
        jqmdateboxmode: {
            deps: ["jquery", 'jqmdatebox']
        },
        jqmdateboxil8n: {
            deps: ["jquery", 'jqmdatebox']
        }
    }
});

require.onError = function (err) {
    if (err.requireType === 'timeout') {
        console.log('modules:' + err.requireModules);
    }
    console.log(err);
    throw err;
};


require(['domReady','namespace',
    'jquery',
    'underscore',
    'backbone',
    'router',
    'jqm'],
    function (domReady, namespace, $, _, Backbone, Router) {
        var App = namespace.app;
        // domReady is RequireJS plugin that triggers when DOM is ready
        domReady(function () {

            function onDeviceReady(desktop) {

                // TODO: check if this works on Android
                // Hiding splash screen
                if (desktop !== true)
                    cordova.exec(null, null, "SplashScreen", "hide", []);

                // Initializing Parse API's
                //Parse.initialize("DeE1IIk6SSWxDVAiywycW78jUBA4ZXXT1nZrFfoV", "QsKQMMV9tQLMiO9GfSh305qP6cy3gqfqCTSQyFEP");

                // Pushing LoginView as a first view of the app
                //$.mobile.jqmNavigator.pushView(new LoginView());


                App.router = new Router;

                App.router.on('all', function (a, b, c, d, e, f) {
                    if (_.isString(a)) {
                        a = a.replace('route:', '');
                    }

                    var url = _.filter([a, b, c, d, e, f], function (item) {
                        return !_.isUndefined(item);
                    }).join('/');

                    if (!_.isUndefined(App.routerHistory)) {
                        App.routerHistory.push(url);
                        if (App.routerHistory.length > 20)
                            App.routerHistory = App.routerHistory.slice(1);
                    } else {
                        App.routerHistory = [url];
                    }
                });

                Backbone.history.start();




            }

            if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
                // This is running on a device so waiting for deviceready event
                document.addEventListener("deviceready", onDeviceReady, false);
            } else {
                // Polyfill for navigator.notification features to work in browser when debugging
                navigator.notification = { alert: function (message) {
                    // Using standard alert
                    alert(message);
                } 
                };
                // On desktop don't have to wait for anything
                onDeviceReady(true);
            }
        });
    }
);






