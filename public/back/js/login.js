// 表单校验
// 1. 进行表单校验配置
//      校验要求:
//          (1) 用户名不能为空, 长度为2-6位
//          (2) 密码不能为空, 长度为6-12位  
$(function () {
    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须在2~6位之间"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                },
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须在6~12位之间"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        }
    })
    // 2.注册表单校验成功事件
    $("#form").on("success.form.bv", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $('#form').serialize(),
            dataType: "json",
            success: function (info) {
                // console.log(info);
                if (info.error == 1000) {
                    // alert('用户名不存在');
                    $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                    return;
                }
                if (info.error == 1001) {
                    // alert('密码错误');
                    $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                    return;
                }
                if (info.success) {
                    location.href = "index.html";
                    return;
                }
            }
        })
    })
    // 3.重置功能
    $('[type="reset"]').click(function () {
        $('#form').data("bootstrapValidator").resetForm();
    })
})