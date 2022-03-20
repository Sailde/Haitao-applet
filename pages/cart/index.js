// pages/cart/index.js
import {
    showModal,
    showToast
} from '../../request/request'
// 引入es6+语法编译
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
    data: {
        address: {},
        cart: [],
        allChecked: false,
        totalPrice: 0,
        totalNum: 0
    },
    onShow() {
        const address = wx.getStorageSync("address")
        const cart = wx.getStorageSync("cart") || [];
        this.setData({
            address
        })
        this.setCart(cart)
    },
    // 点击收货
    handleChooseAddress() {
        wx.chooseAddress({
            success: (address) => {
                address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
                wx.setStorageSync('address', address)
            }
        })
    },
    //商品选中
    handeItemChange(e) {
        const goods_id = e.currentTarget.dataset.id;
        let {
            cart
        } = this.data;
        let index = cart.findIndex(item => item.goods_id === goods_id);
        cart[index].checked = !cart[index].checked;
        this.setCart(cart);
    },
    // 设置购物车状态
    setCart(cart) {
        let allChecked = true
        let totalPrice = 0
        let totalNum = 0
        cart.forEach(item => {
            if (item.checked) {
                totalPrice += item.num * item.goods_price;
                totalNum += item.num;
            } else {
                allChecked = false;
            }
        })
        allChecked = cart.length != 0 ? allChecked : false;
        this.setData({
            totalPrice,
            totalNum,
            allChecked,
            cart
        })
        wx.setStorageSync('cart', cart);
    },
    // 购物车全选
    handleItemAllChange() {
        let {
            allChecked,
            cart
        } = this.data
        allChecked = !allChecked;
        cart.forEach(item => item.checked = allChecked);
        this.setCart(cart);
    },
    // 商品数量的编辑功能
    async handleItemNumEdit(e) {
        const {
            id,
            operation
        } = e.currentTarget.dataset;
        let {
            cart
        } = this.data;
        const index = cart.findIndex(item => item.goods_id === id);
        if (cart[index].num === 1 && operation === -1) {
            const res = await showModal({
                content: '您是否要删除'
            });
            if (res.confirm) {
                cart.splice(index, 1)
                this.setCart(cart)
            }
        } else {
            cart[index].num += operation;
            this.setCart(cart);
        }

    },
    // 点击结算
    async handlePay() {
        const {
            address,
            totalNum
        } = this.data;
        if (!address.userName) {
            await wx.showToast({
                title: '你还没有选择收获地址!',
                icon: "none"
            })
            return
        }
        if (totalNum === 0) {
            await wx.showToast({
                title: '你还未选购商品!',
                icon: "none"
            })
            return
        }
        wx.navigateTo({
            url: '/pages/pay/index',
        })
    }
})