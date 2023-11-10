$(function() {
    // 调用getUserInfo获取用户基本信息
    getUserInfo()

    var layer = layui.layer
        // 点击退出 实现退出功能
    $('#btnLogout').on('click', function() {
        //console.log('ok')
        // 提示用户是否退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1.清空本地存储的 token
            localStorage.removeItem('token')
                //2.重新跳转到登录页面
            location.href = 'login.html'
            layer.close(index);
        });
    })
});
// 函数:发起ajax请求,获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo', //存在权限,需要加请求的headers,在里面存储token信息(验证信息)
        // headers 就是请求头配置对象(放置到baseAPI.js中)
        /* headers: {
            Authorization: localStorage.getItem('token') || ''
        }, */
        success: function(res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败!')
                }
                // 调用 renderAvatar 函数 渲染用户的头像
                renderAvatar(res.data)
            }
            /* ,
                    complete: function(res) {
                        //console.log('执行了 complete 回调函数')
                        //console.log(res);
                        // 在 complete 回调函数中,可以使用 res.responseJSON拿到服务器响应回来的数据
                        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                            // 1. 强制清空 token
                            localStorage.removeItem('token')
                                //     // 2. 强制跳转到登录页面
                            location.href = '/login.html'
                        }
                    } */
    })
}
// 函数:渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username
        // 2.设置欢迎的文本
    $('welcome').html('欢迎&npsp;&npsp;' + name)
        // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('layui-nav-img').attr('src', user.user.pic).show()
        $('text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('layui-nav-img').hide()
        var first = name[0].toUpperCase() // 第一个字母转大写
        $('text-avatar').html(first).show()
    }
}