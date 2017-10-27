import Vue from 'vue'
import App from './app'
import VueRouter from 'vue-router'
import routes from './router'
import filter from './filter'
import $ from 'jquery'
import config from 'common/js/config'
import common from 'common/js/common'
import util from 'common/js/util'
import popup from 'popup'
require('common/js/jquery.cookie.js')

// format 时间格式化
require('common/js/format');

//分页
require('page'); 

//bootstrap
require('common/lib/bootstrap/css/bootstrap.css');
require('common/lib/bootstrap/js/bootstrap.js');

//公用样式文件
require('common/css/base.scss');

// 路由模块和HTTP模块
Vue.use(VueRouter);

// 使用filter
for (var k in filter) {
	Vue.filter(k, filter[k]);
};

window.common 	= common
window.util 	= util
window.config 	= config
window.popup 	= popup
window.$ 		= $;

/*---------- start 布局写入  ------------*/
window == window.top && document.write('<div id="loading"></div>');
/*---------- end 布局写入    ------------*/

/*--------------------------------------------dom操作 相关 end -------------------------------------------------------*/

window.router = new VueRouter({
	mode: 'history',
	routes: routes
})

//设置title
router.beforeEach((to, from, next) => {
	$("#content").hide()
	document.title = to.meta.title || '启明星'
	window.scrollTo(0, 0)
	let zaneEle = $('div.zane-calendar');
	if(zaneEle.length) $('div.zane-calendar').parent().remove();
	next()
})
router.afterEach((to, from, next) => {
	$("#content").fadeIn()
})

Vue.config.productionTip = false
const app = new Vue(Vue.util.extend({
	router,
}, App))

// 从而让整个应用都有路由功能
app.$mount('#app')


