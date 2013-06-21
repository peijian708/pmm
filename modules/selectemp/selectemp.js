define(['namespace', 'jquery', 'underscore', 'backbone', 'handlebars', 'model/empList/empListModel', 'text!modules/selectemp/selectempView.html', "lib"],
       function (namespace, $, _, Backbone, Handlebars, EmpList, selectempViewTemplate) {
           var selectempView = Backbone.View.extend({
               initialize: function () {
                   //this.template = _.template(selectempViewTemplate);
                   this.model.bind('fetchCompleted:SelectEmp', this.wrapper, this);
               },
               render: function (eventName) {
                   this.$el.html(_.template(selectempViewTemplate));
                   var self = this;
                   this.model.fetch({ data: {}, type: 'POST',
                       success: function (data) {
                           //                           $.each(data.attributes, function (i) {
                           //                               self.collection.add(this);
                           //                           })
                           self.model.trigger("fetchCompleted:SelectEmp");

                           /*
                           var audaciousFn;
                           Handlebars.registerHelper('recursive', function (children, options) {
                           var out = '';
                           if (options.fn !== undefined) {
                           audaciousFn = options.fn;
                           }
                           children.forEach(function (child) {
                           out = out + audaciousFn(child);
                           });
                           return out;
                           });

                           var o = { "name": "root", "children": data };


                           var source = this.$el.find("#employee-li-tpl").html();
                           var template = Handlebars.compile(source);
                           var html = template(o);
                           this.$el.find("#context").append(html)
                           this.$el.find('#context').find('div[data-role=collapsible]').collapsible();
                           this.$el.find("input[type='checkbox']").checkboxradio();*/

                       }
                   });
                   return this;
               },
               wrapper: function () {


                   var audaciousFn;
                   Handlebars.registerHelper('recursive', function (children, options) {
                       var out = '';
                       if (options.fn !== undefined) {
                           audaciousFn = options.fn;
                       }
                       children.forEach(function (child) {
                           out = out + audaciousFn(child);
                       });
                       return out;
                   });
                   var array = [];
                   $.each(this.model.attributes, function (i) {
                       array.push(this);
                   })
                   var c = treeDataConvert(array, { idFiled: "id", textFiled: "name", parentField: "pid" });
                   console.log(c);
                   var o = { "id":"root","name": "root","text":"部门", "children": c };
                   

                   var source = this.$el.find("#employee-li-tpl").html();
                   var template = Handlebars.compile(source);
                   var html = template(o);
                   this.$el.find("#empList").append(html)
                   this.$el.find('#empList').find('div[data-role=collapsible]').collapsible();
                   this.$el.find("input[type='checkbox']").checkboxradio();

               },
               events: {

                   //'pagebeforecreate': 'pagebeforecreateHandler',
                   //'pageinit': 'pageinitHandler',
                   'click #btnEmp': 'selectEmpHandler'


               },
               selectEmpHandler: function () {
                   $("#sNametBaseEmployee1").val("测试");
                   $.mobile.jqmNavigator.popView({ transition: 'slide' });
               }
           });
           return selectempView;
       })