define(['backbone',"lib"], function (Backbone) {
    var d = new Date();
    var SearchModel = Backbone.Model.extend({        
        defaults: {
            CreateDateStart: d.format("yyyy-MM-dd"),
            CreateDateEnd: d.format("yyyy-MM-dd"),
            page:"1"
        }
    });
    return SearchModel;
})

