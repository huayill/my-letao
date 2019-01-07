$(function() {
  //模板引擎渲染
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(info) {
        console.log(info);
        var htmlstr = template("firsttpl", info);
        $("tbody").html(htmlstr);
        //分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function(a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    });
  }
  //    添加分类模态框
  $("#addbtn").click(function() {
    $("#addModal").modal("show");
  });
  //    校验配置
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok", // 校验成功
      invalid: "glyphicon glyphicon-remove", // 校验失败
      validating: "glyphicon glyphicon-refresh" // 校验中
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      }
    }
  });
//   注册表单校验成功事件
$('#form').on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
        type:"post",
        url:'/category/addTopCategory',
        data:$('#form').serialize(),
        dataType:'json',
        success:function(info){
            console.log(info);
            if(info.success){
                $('#addModal').modal("hide");
                currentPage = 1;
                render();
                $('#form').data("bootstrapValidator").resetForm(true);
            }
        }
    })
})
});
