class Ajax {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  base(url, data, method) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '加载中…',
        mask: true
      })
      wx.request({
        url: this.baseUrl + url,
        data,
        header: {
          // 根据项目的要求进行封装
        },
        method,
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          // 当然还可以在这里统一处理错误
          resolve(res)
        },
        fail: (res) => {
          // 当然还可以在这里统一处理错误
          reject(res)
        },
        complete: (res) => {
          wx.hideLoading()
        },
      })
    })
  }
  get(url, data) {
    return this.base(url, data, 'GET')
  }
  post(url, data) {
    return this.base(url, data, 'POST')
  }
}


const ajax = new Ajax('http://www.xiongmaoyouxuan.com')

export default ajax