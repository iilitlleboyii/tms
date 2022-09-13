// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        add: false,
        show: false,
        columns: ['步行', '公交', '汽车', '飞机', '地铁', '高铁', '火车'],
        strategy_id: '',
        ss_id: '',
        ss_name: '',
        ss_price: '',
        ss_trans: '',
        accommodation: '',
        remark: '',
        steps: [],
        item: {
            text: '',
            desc: ''
        },
        active: 0,
    },

    /* 创建攻略码 */
    StrategyCode() {
        var that = this
        let strategy_code = ''
        for (var i = 0; i < 6; i++) {
            strategy_code += Math.floor(Math.random() * 10)
        }
        strategy_code = 'S' + new Date().getTime() + strategy_code
        console.log(strategy_code)
        that.setData({
            strategy_id: strategy_code,
        })
    },

    /* 获取输入的路线点名称 */
    get_item_name(e) {
        this.setData({
            ['item.text']: e.detail
        })
    },

    /* 获取输入的路线点交通工具 */
    get_item_trans(e) {
        this.setData({
            ['item.desc']: e.detail
        })
    },

    /* 关闭添加窗口 */
    onClose_dialog() {
        this.setData({
            ['add']: false
        })
    },

    /* 确认添加路线点 */
    onConfirm_dialog() {
        var that = this
        that.setData({
            ['steps']: that.data.steps.concat([that.data.item]),
            ['item']: {
                text: '',
                desc: ''
            },
            ['active']: that.data.active + 1
        })
    },

    /* 执行添加路线点操作 */
    Additem() {
        this.setData({
            ['add']: true
        })
    },

    /* 执行删除路线点操作 */
    Deleteitem() {
        this.data.steps.pop()
        this.setData({
            ['steps']: this.data.steps,
            ['active']: this.data.active - 1
        })
    },

    /* 执行关闭设置攻略交通工具弹窗操作 */
    onCancel() {
        this.onClose()
    },

    /* 执行设置攻略交通工具操作 */
    onConfirm(event) {
        const {
            picker,
            value,
            index
        } = event.detail;
        this.setData({
            ['ss_trans']: `${value}`
        })
        this.onClose()
    },

    /* 设置弹窗开启状态 */
    showPopup() {
        this.setData({
            show: true
        });
    },

    /* 设置弹窗关闭状态 */
    onClose() {
        this.setData({
            show: false
        });
    },

    /* 执行设置攻略交通工具操作 */
    OnChangeTrans() {
        this.showPopup()
    },

    /* 执行上传攻略操作 */
    post_str() {
        var that = this
        var CACHE_DATA = wx.getStorageSync('CACHE_DATA')
        that.StrategyCode()
        // console.log(JSON.stringify(that.data.steps))
        wx.request({
            url: 'http://yuwechatapplet.vipgz1.91tunnel.com/strategy/', //获取服务器地址，此处为本地地址
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded" //使用POST方法要带上这个header
            },
            data: {
                strategy_id: that.data.strategy_id,
                user_id: CACHE_DATA.openid,
                ss_id: that.data.ss_id,
                ss_name: that.data.ss_name,
                ss_price: that.data.ss_price,
                ss_trans: that.data.ss_trans,
                accommodation: that.data.accommodation,
                remark: that.data.remark,
                steps: JSON.stringify(that.data.steps),
            },
            success(res){
                if(res.data.is_post_str){
                    console.log('提交成功')
                } 
            }
        })
    },












    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})