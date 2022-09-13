// pages/purchase/purchase.js
// import Dialog from '@vant/weapp/dialog/dialog';
var appInstance = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order_data: {
            order_id: '',
            ticket_items: [],
            total_price: null,
            state_code: '0',
        }
    },

    /* 改变卡片门票数量 */
    onChange_ticket_num(e) {
        var card_index = e.currentTarget.dataset.index
        this.setData({
            [`order_data.ticket_items.[${card_index}].ticket_num`]: e.detail
        })
        this.calculate_price()
    },

    /* 生成订单码 */
    OrderCode() {
        var that = this
        let order_code = ''
        for (var i = 0; i < 6; i++) {
            order_code += Math.floor(Math.random() * 10)
        }
        order_code = 'ORDER' + new Date().getTime() + order_code
        that.setData({
            ['order_data.order_id']: order_code,
        })
    },

    /* 执行提交订单操作 */
    post_order() {
        var that = this
        wx.showModal({
            title: '是否立即支付',
            content: '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。',
            success(res) {
                if (res.confirm) {
                    appInstance.globalData.ACTIVE = 2
                    that.setData({
                        ['order_data.state_code']: '1'
                    })
                    wx.showToast({
                        title: '支付完成',
                    })
                } else if (res.cancel) {
                    appInstance.globalData.ACTIVE = 1
                    wx.showToast({
                        title: '支付未完成',
                        icon: 'error',
                    })
                }
                that.OrderCode()
                appInstance.globalData.ORDER_LIST = appInstance.globalData.ORDER_LIST.concat([that.data.order_data])
                appInstance.post_user_order()
                setTimeout(function () {
                    wx.switchTab({
                        url: '../order/order',
                    })
                }, 1000)
            }
        })
        // this.setData({
        //     ['order_data']: {
        //         order_id: '',
        //         ticket_items: [],
        //         total_price: null,
        //     }
        // })
    },

    /* 计算待支付金额 */
    calculate_price() {
        var that = this
        var temp_price = 0
        for (var i = 0; i < that.data.order_data.ticket_items.length; i++) {
            temp_price += (that.data.order_data.ticket_items[i].ticket_num) * (that.data.order_data.ticket_items[i].ticket_price)
        }
        that.setData({
            ['order_data.total_price']: temp_price,
        })
    },

    /* 获取商品列表 */
    get_ticket_item() {
        var ticket_items = wx.getStorageSync('TICKET_ITEMS')
        this.setData({
            ['order_data.ticket_items']: this.data.order_data.ticket_items.concat(ticket_items)
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.get_ticket_item()
        this.calculate_price()
    }
})