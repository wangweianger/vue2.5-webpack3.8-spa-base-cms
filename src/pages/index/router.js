// 模块路由设置
module.exports = [{
	path: '/index/index',
	name: 'index1',
	meta: {
		title: '首页',
	},
	component: resolve => require(['./index.vue'], resolve)
}, {
	path: '/index/indexui',
	name: 'indexui',
	meta: {
		title: '首页UI',
	},
	component: resolve => require(['./indexui.vue'], resolve)
}, ]