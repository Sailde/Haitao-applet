// pages/category/index.js
import {
    request
} from "../../request/request"

import regeneratorRuntime from "../../lib/runtime/runtime"

Page({
    data: {
        leftMenuList: [],
        rightContent: [],
        currentIndex: 0,
        scrollTop: 0
    },
    Cates: [],

    onLoad: function (options) {
        const Cates = wx.getStorageSync('cates');
        if (!Cates) {
            this.getCateList();
        } else {
            if (Date.now() - Cates.time > 1000 * 300) {
                this.getCateList();
            } else {
                this.Cates = Cates.data;
                this.setData({
                    leftMenuList: this.Cates.map(item => item.cat_name),
                    rightContent: this.Cates[0].children
                })
            }
        }
    },
    async getCateList() {
        const res = await request({
            url: "/categories"
        });
        this.Cates = res
        wx.setStorageSync('cates', {
            time: Date.now(),
            data: this.Cates
        })
        this.setData({
            leftMenuList: this.Cates.map(item => item.cat_name),
            rightContent: this.Cates[0].children
        })
    },
    handleItemTap(e) {
        const {
            index
        } = e.currentTarget.dataset
        this.setData({
            currentIndex: index,
            rightContent: this.Cates[index].children,
            scrollTop: 0
        })
    }
})