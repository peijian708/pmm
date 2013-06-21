require.config({
    paths: {
        jquery: 'vendor/jqm/jquery-1.8.3.min',
        jqmconfig: 'plugin/jqm.config',
        jqm: 'vendor/jqm/jquery.mobile-1.1.0.min',
        underscore: 'vendor/underscore/underscore_amd',
        backbone: 'vendor/backbone/backbone_amd',
        text: 'vendor/require/text',        
        plugin: 'plugin',        
        modules: '../modules',
        model: '../model'
    }

});

require(['app'], function (app) {
    app.initialize();
});