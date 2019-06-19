// pages/mall/mall.js
import ajax from '../../utils/ajax.js';

const app = getApp()

Page({

  addToCart (e) {
    app.setCart(e.currentTarget.dataset.product)
  },

  loadMore () {
    console.log('aaa')
  },

  getProducts () {
    ajax.get(`/api/tab/${this.data.currentCateId}?start=0`)
      .then(resp => {
        console.log(resp)
        this.setData({
          products: resp.data.data.items.list
        })
      })
  },

  getCateNav () {
    ajax.get('/api/tabs')
      .then(resp => {
        this.setData({
          cateNav: resp.data.data.list.slice(1),
          currentCateId: resp.data.data.list[1].id
        }, () => {
          this.getProducts()
        })
      })
  },

  changeCategory (e) {
    this.setData({
      currentCateId: e.currentTarget.dataset.id
    }, () => {
      this.getProducts()
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    cateNav: [],
    currentCateId: 0,
    products: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCateNav()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.setBadge()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})