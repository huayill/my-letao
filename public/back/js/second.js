$(function(){
    //模板引擎渲染
    var currentPage = 1;
    var pageSize = 5;
    render();
  function render(){
    $.ajax({
        type:"get",
        url:"/category/querySecondCategoryPaging",
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        dataType:"json",
        success:function(info){
            console.log(info);
            var htmlstr = template("secondtpl",info);
            $('tbody').html(htmlstr);
            $("#pagintor").bootstrapPaginator({
                bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                currentPage:info.page,//当前页
                totalPages:Math.ceil(info.total / info.size),//总页数
                size:"small",//设置控件的大小，mini, small, normal,large
                onPageClicked:function(a, b, c,page){
                  //为按钮绑定点击事件 page:当前点击的按钮值
                  currentPage = page;
                  render();
                }
              });
              
        }
    })
  }
  //模态框
  $('#addBtn').click(function(){
      $('#addtModal').modal("show");
      //   点击按钮,发送请求,渲染下拉菜单
      $.ajax({
          type: "get",
          url: "/category/queryTopCategoryPaging",
          data:{
              page:1,
              pageSize:100
          },
          dataType:'json',
          success:function(info){
              console.log(info);
              var htmlstr = template("droptpl",info);
              $('.dropdown-menu').html(htmlstr);
          }
  })
})
// 给下拉菜单的a添加点击事件
$(".dropdown-menu").on('click','a',function(){
    var txt = $(this).text();
    $('#droptxt').text(txt);
    var id = $(this).data('id');
    $('[name="categoryId"]').val(id);
    $('#form').data("bootstrapValidator").updateStatus( "categoryId", "VALID" )


})
// 配置fileupload进行初始化
$('#fileupload').fileupload({
    dataType:'json',
    done:function(e,data){
        console.log(data);
        var picurl = data.result.picAddr;
        $('#imgbox img').attr("src",picurl);
        $('[name="brandLogo"]').val(picurl);
        $('#form').data("bootstrapValidator").updateStatus( "brandLogo", "VALID" )

    }
})
// 表单校验
$('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
        valid: "glyphicon glyphicon-ok", // 校验成功
        invalid: "glyphicon glyphicon-remove", // 校验失败
        validating: "glyphicon glyphicon-refresh" // 校验中
      },
      fields: {
        categoryId: {
          validators: {
            notEmpty: {
              message: "请选择一级分类"
            }
          }
        },
        brandName: {
            validators: {
              notEmpty: {
                message: "请输入二级分类名称"
              }
            }
          },
          brandLogo: {
            validators: {
              notEmpty: {
                message: "请上传图片"
              }
            }
          }
      }
})
// 注册表单校验成功事件
$('#form').on("success.form.bv",function(e){
  e.preventDefault();
  $.ajax({
    type:"post",
    url:'/category/addSecondCategory',
    data:$('#form').serialize(),
    dataType:'json',
    success:function(info){
      if(info.success){
        $('#addtModal').modal("hide");
        currentPage = 1;
        render();
        $('#form').data("bootstrapValidator").resetForm(true);
        $('#droptxt').text("请选择一级分类");
        $("#imgbox img").attr("src","./images/none.png");
      }
    }
  })
})

})