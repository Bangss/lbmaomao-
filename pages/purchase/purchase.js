// pages/purchase/purchase.js
Page({

	onShareAppMessage() {
    return {
      title: 'form',
      path: 'page/component/pages/form/form'
    }
  },

  data: {
    gName:'',
    pNum:'',
    pPrice:'',
    pDate:'',
    pOrder:'',
    merchant:'',
    bId:'',
    cId:'',
    pickerHidden: true,
		chosen: '',
		cArray: ['眼影', '高光', '腮红', '口红','粉底液','粉底棒','修容'],
    cObjectArray: [
      {
        id: 201,
        name: '眼影'
      },
      {
        id: 202,
        name: '腮红'
      },
      {
        id: 203,
        name: '口红'
      },
      {
        id: 204,
        name: '高光'
			},
			{
				id: 205,
				name: '修容'
			},
			{
				id: 206,
				name: '眼影刷'
      },
      {
        id: 207,
        name: '腮红刷'
      },
      {
        id: 208,
        name: '粉底液'
      },
      {
        id: 209,
        name: '粉底棒'
      },
      {
        id: 210,
        name: '睫毛膏'
      },
      {
        id: 211,
        name: '眼线笔'
      },
      {
        id: 212,
        name: '眉笔'
      }
    ],
		cIndex: 0,
		bArray: ['3CE', 'MAC', '兰蔻Lancome', 'LUNASOL','NARS','MUF','TOM FORD'],
    bObjectArray: [
      {
        id: 101,
        name: '3CE'
      },
      {
        id: 102,
        name: 'NARS'
      },
      {
        id: 103,
        name: 'LUNASOL'
      },
      {
        id: 104,
        name: 'MAC'
      },
      {
        id: 105,
        name: '兰蔻Lancome'
      },
      {
        id: 106,
        name: 'MUF'
      },
      {
        id: 107,
        name: 'TOM FORD'
      },
      {
        id: 108,
        name: '其他'
      }
    ],
    bIndex: 0,
  },
	cBindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value
    var id = this.data.cObjectArray[index].id
    console.log(id)
    this.setData({
      cIndex: e.detail.value,
      cId: id
    })
    console.log(this.data.cId)
  },
  bBindPickerChange: function(e) {
    var index = e.detail.value
    var id = this.data.bObjectArray[index].id
    this.setData({
      bIndex: e.detail.value,
      bId: id
    })
    console.log(this.data.bId)
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      pDate: e.detail.value
    })
  },
  pickerConfirm(e) {
    this.setData({
      pickerHidden: true
    })
    this.setData({
      chosen: e.detail.value
    })
  },

  pickerCancel() {
    this.setData({
      pickerHidden: true
    })
  },

  pickerShow() {
    this.setData({
      pickerHidden: false
    })
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: 'http://81.68.142.106:8080/lbmaomao/purchase/add',
      method:"POST",
			header:{
				'content-type': 'application/json',
				'chartset': 'utf-8'
      },
      data:{
        gName: e.detail.value.gName,
        pNum: e.detail.value.pNum,
        pPrice: e.detail.value.pPrice,
        pDate: this.data.pDate,
        pOrder:e.detail.value.pOrder,
        merchant: e.detail.value.merchant,
        cId: this.data.cObjectArray[this.data.cIndex].id,
        bId: this.data.bObjectArray[this.data.bIndex].id
      },
      success: function (res) {
        console.log(res)
      }
    })
  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    var nowDate = new Date();
    var year = nowDate.getFullYear(),month = nowDate.getMonth+1, day = nowDate.getDate()
    this.setData({
      "nowDateString": '${year}-${month}-${day}'
    })
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