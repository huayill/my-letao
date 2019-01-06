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
    $('.lt_aside .category').click(function(){
        $(this).next().stop().slideToggle();
    })
    //左边侧边栏切换
    $('.icon_menu').click(function(){
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
        $('.topbar').toggleClass('hidemenu');
    })
    // 退出功能
    $('.icon_logout').click(function(){
        $('#logoutModal').modal("show");
    })
    $('.logoutBtn').click(function(){
        $.ajax({
            type:'get',
            dataType:'json',
            url:'/employee/employeeLogout',
            success:function(info){
                console.log(info);
                if(info.success){
                    location.href = 'login.html';
                }
            }
        })
    })
})
