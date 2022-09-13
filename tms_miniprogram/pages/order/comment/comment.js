// pages/order/comment/comment.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order_ticket_items: [],
        comment_item: {
            ticket_id: '',
            ticket_name: '',
            imageURL: '',
            trans_value: 0,
            service_value: 0,
            scene_value: 0,
            total_value: 0,
            message: '',
            image_list: [],
        },
        count: 0,
    },

    get_message(e) {
        this.setData({
            ['comment_item.message']: e.detail
        })
    },

    add_image() {
        var that = this
        wx.chooseImage({
            count: 3,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                wx.showToast({
                    title: '正在上传...',
                    icon: "loading",
                    mask: true,
                    duration: 1000
                })
                // const tempFilePaths = res.tempFilePaths
                // that.setData({
                //     ['comment_item.image_list']: that.data.comment_item.image_list.concat(tempFilePaths)
                // })
                for (var i = 0; i < res.tempFilePaths.length; i++) {
                    let imgbase64 = 'data:image/png;base64,' + wx.getFileSystemManager().readFileSync(res.tempFilePaths[i], "base64")
                    // let imgbase64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[i], "base64")
                    // var imgData = imgbase64.replace(/[]/g, '') // 将回车换行换为空字符''
                    that.data.comment_item.image_list.push(imgbase64)
                    that.setData(that.data)
                }
                console.log(that.data.comment_item.image_list)
            },
            fail(res) {
            }
        })
    },
    delete_image() {
        let temp_image_list = this.data.comment_item.image_list
        temp_image_list.pop()
        this.setData({
            ['comment_item.image_list']: temp_image_list
        })
    },
    priview(e) {
        let index = e.target.dataset.index;
        wx.previewImage({
            current: this.data.comment_item.image_list[index],
            urls: this.data.comment_item.image_list
        })
    },
    change_trans(e) {
        this.setData({
            ['comment_item.trans_value']: e.detail
        })
        this.calculate_total_value()
    },
    change_service(e) {
        this.setData({
            ['comment_item.service_value']: e.detail
        })
        this.calculate_total_value()
    },
    change_scene(e) {
        this.setData({
            ['comment_item.scene_value']: e.detail
        })
        this.calculate_total_value()
    },
    calculate_total_value() {
        this.setData({
            ['comment_item.total_value']: (this.data.comment_item.trans_value + this.data.comment_item.service_value + this.data.comment_item.scene_value) / 3
        })
        // console.log(this.data.total_value)
    },
    save() {
        this.post_comment()
        console.log(this.data.comment_item)
        if ((this.data.count + 1) < this.data.order_ticket_items.length) {
            this.setData({
                ['count']: this.data.count + 1
            })
            this.comment_item_default()
        } else {
            wx.navigateBack()
        }
    },
    post_comment() {
        var that = this
        var CACHE_DATA = wx.getStorageSync('CACHE_DATA')
        wx.request({
            url: 'http://yuwechatapplet.vipgz1.91tunnel.com/comment/',
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded" //使用POST方法要带上这个header
            },
            data: {
                user_id: CACHE_DATA.openid,
                comment_item: JSON.stringify(that.data.comment_item)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        var temp_order_ticket_items = wx.getStorageSync('ORDER_TICKET_ITEMS')
        this.setData({
            ['order_ticket_items']: temp_order_ticket_items
        })
        this.comment_item_default()
    },
    comment_item_default() {
        var that = this
        that.setData({
            ['comment_item']: {
                ticket_id: that.data.order_ticket_items[that.data.count].ticket_id,
                ticket_name: that.data.order_ticket_items[that.data.count].ticket_name,
                imageURL: that.data.order_ticket_items[that.data.count].imageURL,
                trans_value: 0,
                service_value: 0,
                scene_value: 0,
                total_value: 0,
                message: '',
                image_list: [],
            }
        })
        // console.log(that.data.comment_item)
    }
})