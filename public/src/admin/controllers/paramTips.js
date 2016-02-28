angular.module('apix').controller('ParamTipsCtrl', ParamTipsCtrl);

ParamTipsCtrl.$inject = [];

function ParamTipsCtrl() {

	var vm = this;

	////////////////////////// variables bind to view ///////////////////////////

	vm.formData = {};	// 页面数据

	// code-mirror 配置信息
	vm.cmOption = {
		theme: 'paraiso-dark',
		readOnly: true,
		mode: {name: "javascript", json: true}
	};

	// 输入输出参数书写建议
	vm.formData.tips = 
		'/**' +
 		'\n* 说明' +
 		'\n*' + 
 		'\n* 1. 使用标准的 JSON 格式，每个参数的格式形如 => Field: Type,	// Description' +
 		'\n* 2. Type 有 String, Number, Boolean, Date, Object, Array 六种' +
 		'\n* 3. 嵌套对象以 2 个空格键缩进' +
 		'\n* 4. 若不需要参数，则直接不填即可' + 
 		'\n*/' +
 		'\n\n// 输入参数示例' +
		'\n{' + 		
		'\n  username: String,	// 用户名' +
		'\n  password: String,	// 用户密码' +
		'\n  age: Number 		// 用户年龄' +
		'\n}' + 
		'\n\n// 输出参数示例' +
		'\n{' + 
		'\n  errCode: String,	// 失败码，0表示成功' +
		'\n  errMsg: String,		// 失败信息，success表示成功' +
		'\n  data: Object		// 返回数据' +
		'\n    id: String		// 用户id' +
		'\n}';

}
