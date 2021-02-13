// pages/purchase/queryOne/queryOne.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		gId: "",
		gName: "",
		gNum: "",
		bId:"",
		cId:"",
		flag:"",
		bText1:"",
		bText2:"",
		ft1:"",
		bt1:"",
		bt2:"",
		pickerHidden: true,
		chosen: '',
    cObjectArray: [
      {
        id: 201,
        name: '眼影'
      },
      {
        id: 202,
        name: '九色眼影'
      },
      {
        id: 203,
        name: '十六色眼影'
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
			},
			{
        id: 213,
        name: '腮红'
			},
			{
        id: 214,
        name: '口红'
			},
    ],
		cIndex: 0,
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
	editDetail: function(e) {
		this.setData({
			bText1:"保存",
			bText2:"取消",
			bt1:"saveDetail",
			bt2:"cancleEdit",
			ft1:"submit",
			flag:false,
			
		})
	},
	saveDetail: function(e){
		this.setData({
			bText1:"编辑",
			bText2:"返回订单列表",
			bt1:"editDetail",
			bt2:"backToList",
			ft1:"",
			flag:true
		})
		this.setData({})
	},
	formSubmit(e) {
		console.log('form发生了submit事件，携带数据为：', e.detail.value)
		console.log(this.data.gId)
    wx.request({
      url: 'http://localhost:8080/lbmaomao/inventory/update',
      method:"POST",
			header:{
				'content-type': 'application/json',
				'chartset': 'utf-8'
      },
      data:{
				gId:this.data.gId,
        gName: e.detail.value.gName,
        gNum: e.detail.value.pNum,
        cId: this.data.cObjectArray[this.data.cIndex].id,
        bId: this.data.bObjectArray[this.data.bIndex].id
      },
      success: function (res) {
        console.log(res)
      }
    })
	},
	
	cancleEdit: function(e) {
		this.setData({
			bText1:"编辑",
			bText2:"返回库存列表",
			bt1:"editDetail",
			bt2:"backToList",
			ft1:"",
			flag:true
		})
		this.setData({})
	},
	
	backToList: function(e) {
		wx.navigateTo({
			url: '../inventory',
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var id = this.data.gId
		if(id == ""){
			id=options.g_id
		}
		this.setData({
			gId: id,
			flag: true,
			bText1:"编辑",
			bText2:"返回库存列表",
			bt1:"editDetail",
			bt2:"backToList",
		})
		var that = this
		var bA = this.data.bObjectArray
		var cA = this.data.cObjectArray
		wx.request({
			url: 'http://localhost:8080/lbmaomao/inventory/detail',
			method:"POST",
			data:{
				gId: this.data.gId,
			},
			header:{
				'content-type': 'application/json',
				'chartset': 'utf-8'
			},
			success:function(res){
				console.log(res)
				that.setData({
					detail: res.data.data
				})
				bA.forEach(function(item , index){
					if(res.data.data.bId == bA[index].id){
						that.setData({
							bIndex:index
						})
					}
				})
				cA.forEach(function(item , index){
					if(res.data.data.cId == cA[index].id){
						that.setData({
							cIndex:index
						})
					}
				})
				console.log(that.data.bIndex)
				console.log(that.data.cIndex)
			}
		}
		)
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