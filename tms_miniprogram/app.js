// app.js
App({
    globalData: {
        userInfo: null,
        ACTIVE: 0,
        SHOP_CART: [],
        ORDER_LIST: [],
        COLLECT_LIST: [],
    },
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        wx.cloud.init({
            env: 'tms-6g5jr3dg7070b741',
            traceUser: true
        })

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.request({
                    url: 'https://zjgsujiaoxue.applinzi.com/index.php/Api/Weixin/code_to_openidv2',
                    data: {
                        'code': res.code,
                        'from': 'wx619c78fccdfcd64c'
                    },
                    success: function (res) {
                        //将SESSIONID保存到本地storage
                        wx.setStorageSync('CACHE_DATA', res.data)
                        // if(!res.data.is_register){
                        //   wx.navigateTo({
                        //     url: '../register/register',
                        //   })
                        // }else{
                        //   wx.navigateTo({
                        //     url: '../login/login',
                        //   })
                        // }
                    },
                    fail: function (res) {
                        console.log('res' + res)
                    }
                })
            }
        })
        // this.get_user_order()
        // this.get_user_collect()
    },

    /* 执行获取用户收藏列表操作 */
    get_user_collect() {
        var that = this
        var CACHE_DATA = wx.getStorageSync('CACHE_DATA')
        wx.request({
            url: 'http://yuwechatapplet.vipgz1.91tunnel.com/collectdownload/',
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded" //使用POST方法要带上这个header
            },
            data: {
                user_id: CACHE_DATA.openid,
            },
            success(res) {
                // console.log(res.data)
                that.globalData.COLLECT_LIST = res.data
                // console.log('初始收藏列表：', that.globalData.COLLECT_LIST)
            },
            fail(res) {
            }
        })
    },

    /* 执行用户收藏列表更新操作 */
    update_user_collect(){
        var that = this
        var CACHE_DATA = wx.getStorageSync('CACHE_DATA')
        wx.request({
            url: 'http://yuwechatapplet.vipgz1.91tunnel.com/collectupdate/',
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded" //使用POST方法要带上这个header
            },
            data: {
                user_id: CACHE_DATA.openid,
                collect_list:JSON.stringify(that.globalData.COLLECT_LIST),
            },
            success(res){
                // console.log('更新后收藏列表：', that.globalData.COLLECT_LIST)
            }
        })
    },

    /* 执行获取用户订单操作 */
    get_user_order() {
        var that = this
        var CACHE_DATA = wx.getStorageSync('CACHE_DATA')
        wx.request({
            url: 'http://yuwechatapplet.vipgz1.91tunnel.com/order/download/', //获取服务器地址，此处为本地地址
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded" //使用POST方法要带上这个header
            },
            data: {
                user_id: CACHE_DATA.openid,
            },
            success(res) {
                console.log('下载成功！')
                that.globalData.ORDER_LIST = res.data
            },
            fail(res) {
                console.log('下载失败！')
            }
        })
    },

    /* 执行取消订单操作 */
    delete_user_order(index) {
        var that = this
        wx.request({
            url: 'http://yuwechatapplet.vipgz1.91tunnel.com/order/delete/',
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded" //使用POST方法要带上这个header
            },
            data: {
                order_id: that.globalData.ORDER_LIST[index].order_id,
            },
            success(res) {
                console.log('删除订单成功')
            },
            fail(res) {

            }
        })
    },

    /* 执行更新订单状态操作 */
    update_user_order(index) {
        var that = this
        wx.request({
            url: 'http://yuwechatapplet.vipgz1.91tunnel.com/order/update/',
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded" //使用POST方法要带上这个header
            },
            data: {
                order_id: that.globalData.ORDER_LIST[index].order_id,
            },
            success(res) {
                console.log('更新订单状态成功')
            },
            fail(res) {

            }
        })
    },

    /* 执行上传用户订单操作 */
    post_user_order() {
        var that = this
        var CACHE_DATA = wx.getStorageSync('CACHE_DATA')
        var temp_order_list = that.globalData.ORDER_LIST
        wx.request({
            url: 'http://yuwechatapplet.vipgz1.91tunnel.com/order/upload/', //获取服务器地址，此处为本地地址
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded" //使用POST方法要带上这个header
            },
            data: {
                user_id: CACHE_DATA.openid,
                order_list: JSON.stringify(temp_order_list),
            },
            success(res) {
                console.log('上传成功！')
            },
            fail(res) {
                console.log('上传失败！')
                that.globalData.ORDER_LIST.pop()
            }
        })
    }
})