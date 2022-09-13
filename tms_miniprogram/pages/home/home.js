import {
    areaList
} from '@vant/area-data';

var appInstance = getApp()

Page({
    data: {
        areaList,
        show: false,
        temp_area: {
            province: areaList.province_list[110000],
            city: areaList.city_list[110100],
            country: areaList.county_list[110101]
        },
        search_value: '',
        ticket_item: {
            ticket_name: '',
            ticket_id: '',
            ticket_info: '',
            ticket_num: 1,
            ticket_price: '',
            imageURL: '',
        },
        ticket_items: [],
        pagenum: 0,
        pagesize: 10,
        reg: '',
    },

    /* 点击显示详情 */
    show_scenic_info(e){
        var that = this
        var card_index = e.currentTarget.dataset.index
        // console.log(that.data.ticket_items[card_index])
        wx.setStorageSync('SCENIC_ITEM', that.data.ticket_items[card_index])
        wx.navigateTo({
          url: './scenic/scenic',
        })
    },

    /*小程序启动，自动加载一次页面*/
    onLoad() {
        this.give()
    },

    /*上拉触底加载新数据*/
    onReachBottom: function () { //触底开始下一页
        this.setData({
            ['pagenum']: this.data.pagenum + 1
        })
        this.give(); //重新调用请求获取下一页数据
    },

    /*点击定位设置地点*/
    showPopup() {
        this.setData({
            ['show']: true
        })
    },

    /*关闭底部弹窗*/
    onClose() {
        this.setData({
            ['show']: false
        })
    },

    /*地点选择器底部弹窗确认操作*/
    area_confirm(e) {
        // console.log('area_detail',e.detail.values)
        this.setData({
            ['ticket_items']: [],
            ['pagenum']: 0,
            ['reg']: ''
        })
        this.setData({
            ['temp_area.province']: areaList.province_list[e.detail.values[0].code],
            ['temp_area.city']: areaList.city_list[e.detail.values[1].code],
            ['temp_area.country']: areaList.county_list[e.detail.values[2].code],
            ['show']: false
        })
        this.give()
    },

    /* 执行加购操作 */
    Add_Purchase(e) {
        var card_index = e.currentTarget.dataset.index
        let temp_shop_cart = new Set(appInstance.globalData.SHOP_CART)
        if (temp_shop_cart.has(this.data.ticket_items[card_index]) == false) {
            appInstance.globalData.SHOP_CART = appInstance.globalData.SHOP_CART.concat([this.data.ticket_items[card_index]])
            wx.showToast({
                title: '加购成功',
            })
        }else{
            wx.showToast({
                title: '加购失败，已存在',
                icon: 'none',
              })
        }

    },

    /*改变搜索框内容*/
    onChange(e) {
        this.setData({
            search_value: e.detail
        })
    },

    /*单机搜索按钮事件*/
    onClick(e) {
        this.onSearch(e.currentTarget.dataset)
    },

    /*执行搜索操作*/
    onSearch(e) {
        //后面实现
        var that = this
        // var reg = new RegExp(e.detail, 'g')//将搜索内容转化成正则表达式
        // var test_arr = that.data.ticket_item.ticket_name.join('|')//待匹配字符串
        // var str = test_arr.match(reg)//匹配成功返回数组
        // var flag = reg.test(e.detail)
        // console.log('reg:' ,reg)
        // console.log('length:', str.length)
        // console.log('flag:', flag) //如果是false则表示全是中文
        that.setData({
            ['ticket_items']: [],
            ['pagenum']: 0,
            ['reg']: e.detail
        })
        // console.log(that.data.pagenum)
        that.give()
    },

    /*向后端请求获取数据*/
    give() {
        wx.request({
            url: 'http://yuwechatapplet.vipgz1.91tunnel.com/home/', //获取服务器地址，此处为本地地址
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded" //使用POST方法要带上这个header
            },
            data: {
                pagenum: this.data.pagenum,
                pagesize: this.data.pagesize,
                province: this.data.temp_area.province,
                reg: this.data.reg,
            },
            success: res => {
                var that = this
                if (res.statusCode == 200) {
                    // console.log(res.data)
                    if (res.data.length > 0) {
                        for (var i = 0; i < res.data.length; i++) {
                            that.setData({
                                ['ticket_item']: {
                                    ticket_name: res.data[i]['ss_name'],
                                    ticket_id: res.data[i]['ss_id'],
                                    ticket_info: res.data[i]['ss_info'],
                                    ticket_num: 1,
                                    ticket_price: res.data[i]['ss_price'],
                                    imageURL: res.data[i]['ss_imgurl'],
                                },
                            })
                            that.setData({
                                ['ticket_items']: that.data.ticket_items.concat([that.data.ticket_item]),
                                ['ticket_item']: {
                                    ticket_name: '',
                                    ticket_id: '',
                                    ticket_info: '',
                                    ticket_num: 1,
                                    ticket_price: '',
                                    imageURL: '',
                                }
                            })
                        }
                    }
                }
            }
        })
    },

    /* 改变卡片门票数量 */
    onChange_ticket_num(e) {
        var card_index = e.currentTarget.dataset.index
        this.setData({
            [`ticket_items[${card_index}].ticket_num`]: e.detail
        })
    },

    /* 执行购票操作 */
    buy(e) {
        var card_index = e.currentTarget.dataset.index
        var that = this
        let temp_ticket_item = {
            ticket_name: that.data.ticket_items[card_index].ticket_name,
            ticket_id: that.data.ticket_items[card_index].ticket_id,
            ticket_num: that.data.ticket_items[card_index].ticket_num,
            ticket_price: that.data.ticket_items[card_index].ticket_price,
            imageURL: that.data.ticket_items[card_index].imageURL,
        }
        wx.setStorageSync('TICKET_ITEMS', [temp_ticket_item])
        wx.navigateTo({
            url: '../purchase/purchase',
        })
    }
})