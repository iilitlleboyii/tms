// pages/home/scenic/scenic.js
var appInstance = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        scenic_item: {
            scenic_id: '',
            scenic_name: '',
            scenic_info: '',
            scenic_imageURL: '',
        },
        like: null,
    },

    /* 执行收藏/取消操作 */
    change_like() {
        this.collect()
        this.setData({
            ['like']: !this.data.like
        })
        appInstance.update_user_collect()
    },

    /* 收藏 */
    collect() {
        var that = this
        var temp_scenic_item = that.data.scenic_item
        delete temp_scenic_item['scenic_info']
        if (that.data.like == false) {
            appInstance.globalData.COLLECT_LIST = appInstance.globalData.COLLECT_LIST.concat([temp_scenic_item])
        } else {
            let temp_scenic_items = new Set(appInstance.globalData.COLLECT_LIST)
            var index = appInstance.globalData.COLLECT_LIST.indexOf(temp_scenic_item)
            if (temp_scenic_items.has(temp_scenic_item) == true) {
                appInstance.globalData.COLLECT_LIST.splice(index, 1)
            }
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        var SCENIC_ITEM = wx.getStorageSync('SCENIC_ITEM')
        this.setData({
            ['scenic_item']: {
                scenic_id: SCENIC_ITEM.ticket_id,
                scenic_name: SCENIC_ITEM.ticket_name,
                scenic_info: SCENIC_ITEM.ticket_info,
                scenic_imageURL: SCENIC_ITEM.imageURL,
            }
        })
        this.judge_if_collect()
    },

    /* 判断是否已收藏 */
    judge_if_collect() {
        var temp_scenic_item = this.data.scenic_item
        delete temp_scenic_item['scenic_info']
        let temp_scenic_items = new Set(appInstance.globalData.COLLECT_LIST)
        // console.log(temp_scenic_items.has(temp_scenic_item))
        if (temp_scenic_items.has(temp_scenic_item) == true) {
            this.setData({
                ['like']: true
            })
        } else {
            this.setData({
                ['like']: false
            })
        }
    }
})