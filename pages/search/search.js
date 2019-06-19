// pages/search/search.js
import ajax from '../../utils/ajax.js'

Page({
  handleQChange(e) {
    this.setData({
      q: e.detail.value
    })
  },

  doSearch() {
    const { recentWords, q } = this.data
    if (recentWords.some(item => item.word === q)) {
      recentWords.map(item => {
        if(item.word === q) {
          item.times += 1;
        }
        return item;
      })
    } else {
      recentWords.push({
        word: q,
        times: 1
      })
    }
    recentWords.sort((a, b) => b.times - a.times)
    this.setData({
      recentWords
    }, () => {
      wx.setStorageSync('recentWords', recentWords)
    })
    ajax.get(`/api/search?word=${this.data.q}`)
      .then(resp => {
        // 还需要做一些错误的判断
        this.setData({
          result: resp.data.data.list
        })
      })
  },

  onWordTap(e) {
    this.setData({
      q: e.detail.value
    }, () => {
      this.doSearch()
    })
  },

  getSearchHome() {
    ajax.get('/api/search/home')
      .then(resp => {
        if (resp.data.code === 200) {
          this.setData({
            hotWords: resp.data.data.hotWords
          })
        }
      })
  },
  /**
   * 页面的初始数据
   */
  data: {
    q: '',
    hotWords: [],
    recentWords: wx.getStorageSync('recentWords') || [],
    result: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSearchHome()
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