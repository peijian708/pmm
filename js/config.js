require.config({
    //urlArgs: "timer=" + (new Date()).getTime(),
    deps: ["main"],
    paths: {
        text: 'vendor/require/text.min',
        jquery: 'vendor/jqm/jquery-1.8.3.min',
        underscore: 'vendor/underscore/underscore-min',
        backbone: 'vendor/backbone/backbone-min',
        jqueryTmpl: "vendor/jqm/jsrender.min",
        jqm: 'vendor/jqm/jquery.mobile-1.3.0.min',
        jqmNavigator: 'vendor/jqm/jqmNavigator.min',
        jqueryvalidate: 'plugin/jquery.validate.min',
        jqmdatebox: 'plugin/jqm-datebox.core.min',
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
            deps: ['jquery', 'jqm-config', 'jqmNavigator']
        },
        jqueryTmpl: {
            deps: ['jquery']
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