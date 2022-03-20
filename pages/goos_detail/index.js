// pages/goos_detail/index.js
// 引入封装好的Promise
import {
    request
} from '../../request/request'
// 引入es6+语法编译
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
    data: {
        goodsObj: {}
    },
    GoodsInfo: {},
    onLoad: function (options) {
        const {
            goods_id
        } = options;
        this.getGoodsDetail(goods_id)
    },
    async getGoodsDetail(goods_id) {
        const res = await request({
            url: "/goods/detail",
            data: {
                goods_id
            }
        })
        this.GoodsInfo = res
        this.setData({
            goodsObj: {
                goods_name: res.goods_name,
                goods_price: res.goods_price,
                goods_introduce: res.goods_introduce,
                // 临时改图标
                // goods_introduce:res.goods_introduce.replace(/\.webp/g,'jpg'),
                pics: res.pics
            }
        })
    },
    handlePrevewImage(e) {
        const urls = this.GoodsInfo.pics.map(itme => itme.pics_mid)
        const {
            current
        } = e.currentTarget.dataset
        wx.previewImage({
            current,
            urls
        })
    },
    handleCartAdd(e) {
        let cart = wx.getStorageSync("cart") || [];
        let index = cart.findIndex(item => item.goods_id === this.GoodsInfo.goods_id)
        if (index === -1) {
            this.GoodsInfo.num = 1;
            this.GoodsInfo.checked = true;
            cart.push(this.GoodsInfo);
        } else {
            cart[index].num++;
        }
        wx.setStorageSync('cart', cart)
        wx.showToast({
          title: '加入成功',
          icon: 'success',
          mask: true,
        })
    }
})