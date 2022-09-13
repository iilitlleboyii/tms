// pages/myself/acc_info/acc_info.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        account: '',
        password: '',
        age: '',
        gender: '',
        address: ''
    },

    /* 绑定现有用户信息 */
    Bind_Cache_Data() {
        var USER_INFO = wx.getStorageSync('USER_INFO')
        this.setData({
            name: USER_INFO.user_name,
            account: USER_INFO.user_account,
            age: USER_INFO.user_age,
            gender: USER_INFO.user_gender,
            address: USER_INFO.user_address,
        })
    },

    
    set_Name(e) {
        this.setData({
            name: e.detail
        })
    },
    set_Age(e) {
        this.setData({
            age: e.detail
        })
    },
    set_Gender(e) {
        this.setData({
            gender: e.detail
        })
    },
    set_Address(e) {
        this.setData({
            address: e.detail
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.Bind_Cache_Data()
    },
    save() {
        var that = this
        var CACHE_DATA = wx.getStorageSync('CACHE_DATA')
        console.log(that.data)
        wx.request({
            url: 'http://yuwechatapplet.vipgz1.91tunnel.com/user/',
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded" //使用POST方法要带上这个header
            },
            data: {
                user_id: CACHE_DATA.openid,
                user_name: that.data.name,
                user_account: that.data.account,
                user_age: that.data.age,
                user_gender: that.data.gender,
                user_address: that.data.address,
            },
            success(res) {
                if (res.data[0]) {
                    wx.showToast({
                        title: '保存成功',
                        icon: 'none',
                    })
                }
                wx.setStorageSync('USER_INFO', res.data[1])
                setTimeout(function () {
                    wx.reLaunch({
                        url: '../myself',
                    })
                }, 1000)

            }
        })
    }
})