/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 7/4/12
 * Time: 7:52 PM
 */

require.config({
    deps: ["main"],
    paths: {
        text: 'vendor/require/text',
        domReady: 'vendor/require/domReady',
        jquery: 'vendor/jqm/jquery-1.8.3.min',
        underscore: 'vendor/underscore/underscore',
        backbone: 'vendor/backbone/backbone',
        jqueryTmpl: "vendor/jqm/jsrender.min",
        jqm: 'vendor/jqm/jquery.mobile-1.3.0',
        jqmNavigator: 'vendor/jqm/jqmNavigator',
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
            deps: ['jquery', 'jqm-config', 'jqmNavigator']
        },
        jqueryTmpl: {
            deps: ['jquery']
        }
    }
});

require(['domReady', 'model/home/loginModel', 'modules/home/login', 'jqm'],
    function (domReady, Parse, LoginView) {

        // domReady is RequireJS plugin that triggers when DOM is ready
        domReady(function () {

            function onDeviceReady(desktop) {

                // TODO: check if this works on Android
                // Hiding splash screen
                if (desktop !== true)
                    cordova.exec(null, null, "SplashScreen", "hide", []);

                // Initializing Parse API's
                Parse.initialize("DeE1IIk6SSWxDVAiywycW78jUBA4ZXXT1nZrFfoV", "QsKQMMV9tQLMiO9GfSh305qP6cy3gqfqCTSQyFEP");

                // Pushing LoginView as a first view of the app
                $.mobile.jqmNavigator.pushView(new LoginView());

            }

            if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
                // This is running on a device so waiting for deviceready event
                document.addEventListener("deviceready", onDeviceReady, false);
            } else {
                // Polyfill for navigator.notification features to work in browser when debugging
                navigator.notification = {alert:function (message) {
                    // Using standard alert
                    alert(message);
                }};
                // On desktop don't have to wait for anything
                onDeviceReady(true);
            }
        });
    }
);