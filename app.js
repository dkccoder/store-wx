//app.js
App({
  onLaunch: function () {
    this.setBadge()
  },

  setBadge() {
    wx.setTabBarBadge({
      index: 2,
      text: this.cartList.reduce((result, item) => {
        result += item.quantity
        return result
      }, 0).toString()
    })
  },

  setCart(product) {
    if ( this.cartList.some(item => item.id === product.id) ) {
      this.cartList = this.cartList.map(item => {
        if (item.id === product.id) {
          item.quantity += 1;
        }
        return item;
      })
    } else {
      this.cartList.push({
        ...product,
        quantity: 1
      })
    }
    wx.setStorageSync('cartList', this.cartList)
    this.setBadge()
  },

  cartList: wx.getStorageSync('cartList') || [],
  
})