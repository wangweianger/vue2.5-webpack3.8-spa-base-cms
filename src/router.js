//router.js 路由集合

//默认首页路由
const route = [{
	path: '/',
	name: 'index',
	meta: {
		title: '首页demo',
	},
	component: resolve => require(['pages/index/index.vue'], resolve)
}, ]


//合并路由
var routes = route.concat(
		require('pages/index/router'),
	);

module.exports = routes;