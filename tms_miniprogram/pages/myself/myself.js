// pages/myself/myself.js
var appInstance = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        collect_list: [],
        activeNames: [],
    },


    /* 显示某一栏 */
    onChange(event) {
        this.setData({
            activeNames: event.detail,
        })
    },
    /* 获取用户个人信息 */
    Bind_Cache_Data() {
        var USER_INFO = wx.getStorageSync('USER_INFO')
        this.setData({
            name: USER_INFO.user_name,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.Bind_Cache_Data()
        this.setData({
            ['collect_list']:appInstance.globalData.COLLECT_LIST
        })
    },
        /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            ['collect_list']:appInstance.globalData.COLLECT_LIST
        })
    },
})