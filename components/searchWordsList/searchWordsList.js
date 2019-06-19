// components/searchwords/searchWordsList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    words: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleWordTap(e) {
      // this.$emit()是vue的方法
      this.triggerEvent('wordtap', {
        value: e.currentTarget.dataset.word
      })
    }
  }
})
