window.WorklogView = Backbone.View.extend({
    initialize: function () {
        this.template = _.template(tpl.get('worklogdetail-page'));
    },
    render: function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click #save': 'save'

    },

    save: function (e) {
        var validate = $("#frmWorkLog").valid();
        if (validate) {
            var $frmWorkLog = $("#frmWorkLog");
            var obj = $("#frmWorkLog").formJsonSerialize();
            obj.sNametWorkOrder = $("#sGuidtWorkOrder option:selected").text();
            $.ajax({
                url: "../api/WorkLog/SaveWorkLogs/post",
                type: "POST",
                dataType: 'json',
                data: obj,
                //async: false,
                success: function (d) {
                    if (d.IsSuccess) {
                        toast(d.Message);
                        $("#sGuidWorkLog").val(d.WorkLogId);
                        $("#sGuidWorkLogDetail").val(d.WorkLogDetailId);
                    }
                }

            })
        }
    },
    pagebeforecreate: function (e) {
        //console.info(e);        

        var current = e.model.attributes.sGuidtWorkOrder;

        $.ajax({
            url: "../api/WorkLog/GetWorkOrderByEmployee/post",
            type: "POST",
            dataType: 'json',
            data: {},
            async: false,
            success: function (d) {
                $("#sGuidtWorkOrder").empty();
                $("<option></option>").text("请选择").appendTo("#sGuidtWorkOrder");
                $.each(d, function (i, n) {
                    $("<option></option>").val(this.id).text(this.name).appendTo("#sGuidtWorkOrder"); //.substr(0,5)
                });
                if (current && current != undefined) {
                    $("#sGuidtWorkOrder option").each(function (index) {
                        if (this.value == current) {
                            i = index;
                            if (!$.browser.msie || ($.browser.msie && $.browser.version != "6.0")) {
                                $(this).attr("selected", "selected");
                            }
                        }
                    })
                };
            }
        });

        jQuery.validator.addMethod("isDate", function (value, element) {
            var check = false;
            var re = /^\d{1,4}\-\d{1,2}\-\d{2}$/;
            if (re.test(value)) {
                var adata = value.split('-');
                var gg = parseInt(adata[2], 10);
                var mm = parseInt(adata[1], 10);
                var aaaa = parseInt(adata[0], 10);
                var xdata = new Date(aaaa, mm - 1, gg);
                if ((xdata.getFullYear() == aaaa) && (xdata.getMonth() == mm - 1) && (xdata.getDate() == gg))
                    check = true;
                else
                    check = false;
            } else
                check = false;
            return this.optional(element) || check;
        });

        jQuery.validator.addMethod("isWorkOrder", function (value, element) {
            return this.optional(element) || value != "请选择";
        }, "项目名称不能为空")

        $('#frmWorkLog').validate({
            rules: {
                "CreateDate": {
                    required: true,
                    isDate: true
                },
                "nHoursCount": {
                    required: true,
                    number: true
                },
                "sGuidtWorkOrder": {
                    required: true,
                isWorkOrder:true
                }
                ,
                "sLogText": {
                    required: true
                }
            },
            messages: {
                "CreateDate": {
                    required: "日期不能为空",
                    isDate: "日期格式不正确2011-01-01"
                },
                "nHoursCount": {
                    required: "小时不能为空",
                    number: "格式不正确"
                },
                "sGuidtWorkOrder": {
                    required: "请选择项目名称",
                isWorkOrder:"项目名称不能为空"
                },
                "sLogText": {
                    required: "日志不能为空"
                }
            }
        });

    }


});