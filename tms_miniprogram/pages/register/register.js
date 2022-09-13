Page({
    data: {
        name: '',
        account: '',
        password: '',
        age:'-1',
        gender:'-1',
        address:''
    },

    /* 获取用户输入的用户名 */
    getUserName(e) {
        // console.log('获取到用户名', e.detail)
        this.setData({
            name: e.detail
        })
    },
    /* 获取用户输入的手机号 */
    getUserAccount(e) {
        this.setData({
            account: e.detail
        })
    },
    /* 获取用户输入的密码 */
    getUserPassword(e) {
        this.setData({
            password: e.detail
        })
    },
    /* 单击注册按钮提交表单信息 */
    register() {
        var CACHE_DATA = wx.getStorageSync('CACHE_DATA')
        wx.request({
            url: 'http://yuwechatapplet.vipgz1.91tunnel.com/register/', //获取服务器地址，此处为本地地址
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded" //使用POST方法要带上这个header
            },
            data:{
                user_id: CACHE_DATA.openid,
                user_name: this.data.name,
                user_account: this.data.account,
                user_password: this.data.password,
            },
            success(res){
                var CACHE_DATA = wx.getStorageSync('CACHE_DATA')
                if(res.data.if_register){
                    wx.showToast({
                        title: '注册成功',
                    }),
                    setTimeout(function () {
                        //要延时执行的代码
                    }, 1000), //延迟时间 这里是1秒
                    CACHE_DATA.is_register = true
                    wx.setStorageSync('CACHE_DATA', CACHE_DATA)
                    wx.navigateTo({
                      url: '../login/login',
                    })
                }else{
                    wx.showToast({
                        title: '已注册',
                        icon: 'error'
                    }),
                    wx.navigateTo({
                        url: '../login/login',
                    })
                }
            },
            fail(res){
                console.log(res)
            }
        })
    }
})