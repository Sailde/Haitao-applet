// index.js
import {
    request
} from '../../request/request'

import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
    data: {
        swiperList: [],
        catesList: [],
        floorList: [],
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad() {
        this.getSwiperList();
        this.getCatesList();
        this.getFloorList();
    },
    async getSwiperList() {
        const res = await request({
            url: "/home/swiperdata"
        })
        this.setData({
            swiperList: res
        })
    },
    async getCatesList() {
        const res = await request({
            url: "/home/catitems"
        })
        this.setData({
            catesList: res
        })
    },
    async getFloorList() {
        const res = await request({
            url: "/home/floordata"
        })
        this.setData({
            floorList: res
        })
    }
})