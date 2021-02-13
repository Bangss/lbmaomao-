// pages/purchase/queryAll/queryAll.js
const { $Message } = require('../../../dist/base/index');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		inputShowed: false,
		inputVal: "",
		pId:"",
		gId:"",
		gName:"",
		pDate:"",
		pNum:"",
		pOrder:"",
		pPrice:"",
		merchant:"",
	},

	search: function (value) {
		return new Promise((resolve, reject) => {
				setTimeout(() => {
						resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}])
				}, 200)
			})
	},
	selectResult: function (e) {
			console.log('select result', e.detail)
	},

	query:function(e) {
		var id = e.currentTarget.dataset.id
		wx.navigateTo({
			url: '../queryOne/queryOne?p_id='+id
		})
	
	},
	update:function(e) {
		wx.navigateTo({
			url: '../update/update',
		})
		var id = e.currentTarget.dataset.id
		wx.request({
			url: 'http://81.68.142.106:8080/lbmaomao/purchase/update',
			method:"POST",
			data:{
				pId: id
			},
			header:{
				'content-type': 'application/json',
				'chartset': 'utf-8'
			},
			success:function(res){
				console.log(res)
			}
		}
		)
	},
	delete:function(e) {
		wx.navigateTo({
			url: 'url',
		})
		var id = e.currentTarget.dataset.id
		wx.request({
			url: 'http://81.68.142.106:8080/lbmaomao/purchase/delete',
			method:"POST",
			data:{
				pId: id
			},
			header:{
				'content-type': 'application/json',
				'chartset': 'utf-8'
			},
			success:function(res){
				console.log(res)
			}
		}
		)
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this
		wx.request({
			url: 'http://81.68.142.106:8080/lbmaomao/purchase/queryAll',
			method:"POST",
			header:{
				'content-type': 'application/json',
				'chartset': 'utf-8'
			},
			success: function(res) {
				console.log(res)
				that.setData({
					allRecord:res.data.data
				})
			}
		}),
		this.setData({
			search: this.search.bind(this)
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