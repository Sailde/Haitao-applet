// pages/goods_list/index.js
import {
    request
} from '../../request/request'

import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
    data: {
        titleList: [{
                id: "01",
                title: "综合",
                isActive: true
            },
            {
                id: "02",
                title: "销量",
                isActive: false
            },
            {
                id: "03",
                title: "价格",
                isActive: false
            }
        ],
        goodsList: []
    },
    QueryParams: {
        queru: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
    },
    totalPages: 1,
    onLoad: function (options) {
        this.QueryParams.cid = options.cid
        this.getGoodsList();
    },
    async getGoodsList() {
        const res = await request({
            url: "/goods/search",
            data: this.QueryParams
        })
        const total = res.total;
        this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
        this.setData({
            goodsList: [...this.data.goodsList, ...res.goods]
        })
        wx.stopPullDownRefresh()
    },
    tavsItemChange(e) {
        const {
            titleList
        } = this.data;
        titleList.forEach((item, index) => index === e.detail ? item.isActive = true : item.isActive = false)
        this.setData({
            titleList
        })
    },
    onReachBottom() {
        if (this.QueryParams.pagenum >= this.totalPages) {
            wx.showToast({
                title: '没有下一页数据了！',
            })
        } else {
            this.QueryParams.pagenum++;
            this.getGoodsList();
        }
    },
    onPullDownRefresh() {
        this.setData({
            goodsList: []
        })
        this.QueryParams.pagenum = 1;
        this.getGoodsList();
    }
})