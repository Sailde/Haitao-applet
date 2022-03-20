// 同时发送异步代码的次数
let ajaxTimes = 0
export const request = (params) => {
    ajaxTimes++
    // 定义公共的url
    wx.showLoading({
        title: '正在加载',
        mask: true
    })

    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxTimes--
                if (ajaxTimes === 0) {
                    wx.hideLoading()
                }
            }
        })
    })
}

export const showModal = (content) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            ...content,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

export const showToast = (title,icon) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title:title,
            icon:icon,
            duration: 2000,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}