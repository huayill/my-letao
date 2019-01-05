// 进度条
$(document).ajaxStart(function(){
    NProgress.start();
})
$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    })
},500);

//左侧二级菜单
$(function(){
    $('.lt_aside .nav .category').on('click',function(){
        $(this).next().stop().slideToggle();
    })
})
