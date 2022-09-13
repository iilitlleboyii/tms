// pages/login/login.js
var appInstance = getApp()

Page({
    data: {
        account: '',
        password: ''
    },
    /* 获取用户输入的账号 */
    getInputAccount(e) {
        this.setData({
            ['account']: e.detail,
        })

    },
    /* 获取用户输入的密码 */
    getInputPassword(e) {
        this.setData({
            ['password']: e.detail,
        })
    },

    /* 跳转到注册页 */
    login_register() {
        wx.navigateTo({
            url: '../register/register',
        })
    },
    /* 登录校验 */
    login() {
        let temp_user_account = this.data.account
        let temp_user_password = this.data.password
        var CACHE_DATA = wx.getStorageSync('CACHE_DATA')
        if ((temp_user_account.length == 11) && temp_user_password ) {
            wx.request({
                url: 'http://yuwechatapplet.vipgz1.91tunnel.com/login/', //获取服务器地址，此处为本地地址
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded" //使用POST方法要带上这个header
                },
                data: {
                    user_id: CACHE_DATA.openid,
                    user_account: temp_user_account,
                    user_password: temp_user_password,
                },
                success(res) {
                    if (res.data[0]) {
                        wx.setStorageSync('USER_INFO', res.data[1])
                        wx.showToast({
                          title: '登录成功',
                          icon: 'none',
                        })
                        setTimeout(function(){
                            wx.switchTab({
                                url: '../home/home',
                            })
                        }, 1000)
                        appInstance.get_user_order()
                        appInstance.get_user_collect()
                    }else{
                        wx.showToast({
                            title: '账号或密码错误',
                            icon: 'error',
                        })
                    }
                }
            })
        } else {
            wx.showToast({
                title: '请正确输入账号和密码',
                icon: 'none',
            })
        }
    }
})