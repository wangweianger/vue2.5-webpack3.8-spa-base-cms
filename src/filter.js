//filter.js 过滤器集合
import util from 'common/js/util'
import accounting from 'accounting'

//定义用的路由集合
let arrFilder = [
	require('pages/index/filter'),
];

let json = {};

//合并过滤器
if (arrFilder.length) {
	for (var i = 0; i < arrFilder.length; i++) {
		json = Object.assign(json, arrFilder[i]);
	};
};
json = Object.assign(json, {
	// 转换为大写
	uppercase(value) {
		if (!value) return;
		return value.toString().toUpperCase();
	},
	// 转换为小写
	lowercase(value) {
		if (!value) return;
		return value.toString().toLowerCase();
	},
	//货币过滤器
	currency(value, symbol, digit, bwf, gwf) {
		if (!value) return;
		return accounting.formatMoney(value, symbol || '¥', digit || 2, bwf || ',', gwf || '.'); // ¥4,999.99
	},
	// 时间过滤器
	date(value, gengefu, full) {
		if (!value) return;
		let ty = gengefu || '-';
		if (full) {
			return moment(value).format('YYYY' + ty + 'MM' + ty + 'DD hh:mm:ss');
		} else {
			return moment(value).format('YYYY' + ty + 'MM' + ty + 'DD');
		};
	},
	//limitTo过滤器
	limitTo(value, num) {
		if (!value) return;
		var text = "";
		if (value.length < num) {
			text = value;
		} else {
			text = value.substring(0, num) + '···';
		}
		return text;
	},
});

module.exports = json;