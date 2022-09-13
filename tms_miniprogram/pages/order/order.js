// pages/order/order.js
var appInstance = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        active: appInstance.globalData.ACTIVE,
        shop_cart: appInstance.globalData.SHOP_CART,
        unpaid_list: [],
        paid_list: [],
        selected: [],
        all_selected: false,
        selector_total_price: null,
        selected_items: [],
        unpaid_show_list: [],
        paid_show_list: [],
    },

    /* 控制已付款订单详情显示 */
    onchange_unpaidshow(e) {
        var order_index = e.currentTarget.dataset.index
        this.setData({
            [`unpaid_show_list[${order_index}]`]: !this.data.unpaid_show_list[order_index]
        })
    },

    /* 控制待付款订单详情显示 */
    onchange_paidshow(e) {
        var order_index = e.currentTarget.dataset.index
        this.setData({
            [`paid_show_list[${order_index}]`]: !this.data.paid_show_list[order_index]
        })
    },

    /* 单项选择器 */
    select(e) {
        var card_index = e.currentTarget.dataset.index
        var flag = true
        this.setData({
            [`selected[${card_index}]`]: !this.data.selected[card_index],
        })
        for (var i = 0; i < this.data.selected.length; i++) {
            if (this.data.selected[i] == false) {
                flag = false
                break
            }
        }
        if (flag == true) {
            this.setData({
                ['all_selected']: true,
            })
        } else {
            this.setData({
                ['all_selected']: false,
            })
        }
        this.calculate_selector_total_price()
    },

    /* 全项选择器 */
    all_select() {
        this.setData({
            ['all_selected']: !this.data.all_selected,
        })
        for (var i = 0; i < this.data.selected.length; i++) {
            this.setData({
                [`selected[${i}]`]: this.data.all_selected,
            })
        }
        this.calculate_selector_total_price()
    },

    /* 执行多选移除操作 */
    delete_all() {
        for (var i = 0; i < this.data.selected.length; i++) {
            if (this.data.selected[i] == true) {
                this.setData({
                    ['selected_items']: this.data.selected_items.concat([this.data.shop_cart[i]])
                })
            }
        }
        let temp_shop_cart = new Set(appInstance.globalData.SHOP_CART)
        for (var i = 0; i < this.data.selected_items.length; i++) {
            let index = appInstance.globalData.SHOP_CART.indexOf(this.data.selected_items[i])
            if (temp_shop_cart.has(this.data.selected_items[i]) == true) {
                appInstance.globalData.SHOP_CART.splice(index, 1)
            }
        }
        this.onShow()
    },

    /* 执行多选购票操作 */
    buy_all() {
        let selected_shop_cart = []
        for (var i = 0; i < this.data.selected.length; i++) {
            if (this.data.selected[i] == true) {
                var obj = this.data.shop_cart[i]
                delete obj.ticket_info
                selected_shop_cart = selected_shop_cart.concat([obj])
            }
        }
        wx.setStorageSync('TICKET_ITEMS', selected_shop_cart)
        // console.log(selected_shop_cart)
        wx.navigateTo({
            url: '../purchase/purchase',
        })
    },

    // /* 执行取消加购操作 */
    // cancel_add_shop(e) {
    //     var card_index = e.currentTarget.dataset.index
    //     appInstance.globalData.SHOP_CART.splice(card_index, 1)
    //     this.onShow()
    // },
    // /* 执行购票操作 */
    // buy(e) {
    //     var card_index = e.currentTarget.dataset.index
    //     wx.setStorageSync('TICKET_ITEM', this.data.shop_cart[card_index])
    //     wx.navigateTo({
    //         url: '../purchase/purchase',
    //     })
    // },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            ['shop_cart']: appInstance.globalData.SHOP_CART,
            ['active']: appInstance.globalData.ACTIVE,
        })
        this.select_default()
        this.calculate_selector_total_price()
        this.judge_state()
        this.show_default()
    },

    /* 判断订单状态 */
    judge_state() {
        this.setData({
            unpaid_list: [],
            paid_list: [],
        })
        for (var i = 0; i < appInstance.globalData.ORDER_LIST.length; i++) {
            if (appInstance.globalData.ORDER_LIST[i].state_code == '0') {
                this.setData({
                    ['unpaid_list']: this.data.unpaid_list.concat(appInstance.globalData.ORDER_LIST[i])
                })
            } else {
                this.setData({
                    ['paid_list']: this.data.paid_list.concat(appInstance.globalData.ORDER_LIST[i])
                })
            }
        }
    },

    /* 改变卡片门票数量 */
    onChange_ticket_num(e) {
        var card_index = e.currentTarget.dataset.index
        appInstance.globalData.SHOP_CART[card_index].ticket_num = e.detail
        this.setData({
            [`shop_cart[${card_index}].ticket_num`]: e.detail
        })
        this.calculate_selector_total_price()
    },

    /* 计算所选择合计价格 */
    calculate_selector_total_price() {
        var temp_total_price = 0
        for (var i = 0; i < this.data.selected.length; i++) {
            if (this.data.selected[i] == true) {
                temp_total_price += (this.data.shop_cart[i].ticket_price) * (this.data.shop_cart[i].ticket_num)
            }
        }
        this.setData({
            ['selector_total_price']: temp_total_price,
        })
    },

    /* 重置选择器状态 */
    select_default() {
        this.setData({
            ['selected']: [],
            ['all_selected']: false,
            ['selected_items']: [],
        })
        for (var i = 0; i < this.data.shop_cart.length; i++) {
            this.setData({
                ['selected']: this.data.selected.concat(false)
            })
        }
    },

    /* 执行取消订单操作 */
    cancel_order(e) {
        var that = this
        var order_index = e.currentTarget.dataset.index
        let temp_order_list = new Set(appInstance.globalData.ORDER_LIST)
        let index = appInstance.globalData.ORDER_LIST.indexOf(that.data.unpaid_list[order_index])
        if (temp_order_list.has(that.data.unpaid_list[order_index]) == true) {
            appInstance.delete_user_order(index)
            appInstance.globalData.ORDER_LIST.splice(index, 1)
            that.judge_state()
            that.show_default()
        }
    },

    /* 执行去付款操作 */
    pay_order(e) {
        var that = this
        var order_index = e.currentTarget.dataset.index
        let temp_order_list = new Set(appInstance.globalData.ORDER_LIST)
        let index = appInstance.globalData.ORDER_LIST.indexOf(that.data.unpaid_list[order_index])
        wx.showModal({
            title: '是否立即支付',
            content: '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。',
            success(res) {
                if (res.confirm) {
                    appInstance.globalData.ACTIVE = 2
                    if (temp_order_list.has(that.data.unpaid_list[order_index]) == true) {
                        appInstance.update_user_order(index)
                        appInstance.globalData.ORDER_LIST[index].state_code = '1'
                        that.judge_state()
                        that.show_default()
                    }
                    wx.showToast({
                        title: '支付完成',
                    })
                } else if (res.cancel) {
                    wx.showToast({
                        title: '支付已取消',
                        icon: 'error',
                    })
                }
            }
        })
    },

    /* 重置订单详情显示 */
    show_default() {
        this.setData({
            ['unpaid_show_list']: [],
            ['paid_show_list']: [],
        })
        for (var i = 0; i < appInstance.globalData.ORDER_LIST.length; i++) {
            if (appInstance.globalData.ORDER_LIST[i].state_code == '0') {
                this.setData({
                    ['unpaid_show_list']: this.data.unpaid_show_list.concat(false)
                })
            } else {
                this.setData({
                    ['paid_show_list']: this.data.paid_show_list.concat(false)
                })
            }
        }
    },

    /* 执行评价操作 */
    comment(e) {
        // console.log('单机了去评价按钮！')
        var that = this
        var index = e.currentTarget.dataset.index
        wx.setStorageSync('ORDER_TICKET_ITEMS',that.data.paid_list[index].ticket_items)
        // console.log(that.data.paid_list[index].ticket_items)
        wx.navigateTo({
          url: './comment/comment',
        })
    }
})