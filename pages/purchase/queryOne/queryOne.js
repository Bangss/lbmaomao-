// pages/purchase/queryOne/queryOne.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		pId: "",
		gId: "",
		gName: "",
		pDate: "",
		pNum: "",
		pPrice: "",
		pOrder: "",
		merchant: "",
		flag:"",
		bText1:"",
		bText2:"",
		ft1:"",
		bt1:"",
		bt2:""
	},

	editDetail: function(e) {
		this.setData({
			bText1:"保存",
			bText2:"取消",
			bt1:"saveDetail",
			bt2:"cancleEdit",
			ft1:"submit",
			flag:false
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
		this.onLoad()
	},
	formSubmit(e) {
		console.log('form发生了submit事件，携带数据为：', e.detail.value)
		console.log(this.data.pId)
    wx.request({
      url: 'http://localhost:8080/lbmaomao/purchase/update',
      method:"POST",
			header:{
				'content-type': 'application/json',
				'chartset': 'utf-8'
      },
      data:{
				pId:this.data.pId,
        gName: e.detail.value.gName,
        pNum: e.detail.value.pNum,
        pPrice: e.detail.value.pPrice,
				pDate: e.detail.value.pDate,
				pOrder:e.detail.pOrder,
        merchant: e.detail.value.merchant
      },
      success: function (res) {
        console.log(res)
      }
    })
	},
	
	cancleEdit: function(e) {
		this.setData({
			bText1:"编辑",
			bText2:"返回订单列表",
			bt1:"editDetail",
			bt2:"backToList",
			ft1:"",
			flag:true
		})
		this.onLoad()
	},
	
	backToList: function(e) {
		wx.navigateTo({
			url: '../queryAll/queryAll',
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var id = this.data.pId
		if(id == ""){
			id=options.p_id
		}
		this.setData({
			pId: id,
			flag: true,
			bText1:"编辑",
			bText2:"返回订单列表",
			bt1:"editDetail",
			bt2:"backToList"
		})
		var that = this
		wx.request({
			url: 'http://localhost:8080/lbmaomao/purchase/detail',
			method:"POST",
			data:{
				pId: this.data.pId,
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