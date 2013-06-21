// Filename: js/app.js
// Author: peij

define([
    'namespace',
    'jquery',
    'underscore',
    'backbone',
    'router',
    'jqm'
], function (namespace, $, _, Backbone, Router) {
    'use strict';

    var App = namespace.app;

    $(function () {
        function onDeviceReady(desktop) {
            if (desktop !== true)
                cordova.exec(null, null, 'SplashScreen', 'hide', []);

            //            $.mobile.pageContainer = $('#container');
            //            $.mobile.defaultPageTransition = 'slide';

            //            // jqm loader ÅäÖÃ
            //            $.mobile.loader.prototype.options.text = "ÕýÔÚÔØÈë...";
            //            $.mobile.loader.prototype.options.textVisible = false;
            //            $.mobile.loader.prototype.options.theme = "z";
            //            $.mobile.loader.prototype.options.html = "";

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

        //        if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
        //            document.addEventListener("deviceready", onDeviceReady, false);
        //        } else {
        onDeviceReady(true);
        // }
    });
}); 