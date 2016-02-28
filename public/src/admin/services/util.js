angular.module('apix').factory('UtilService', UtilService);

UtilService.$inject = ['$q', 'MockHttpService'];

function UtilService($q, MockHttpService) {
    return {
        format: function(txt, compress) {/* 格式化JSON源码(对象转换为JSON文本) */
            var indentChar = '    ';
            if (/^\s*$/.test(txt)) {
                alert('数据为空,无法格式化! ');
                return;
            }
            try {
                var data = eval('(' + txt + ')');
            }
            catch (e) {
                alert('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err');
                return;
            }
            ;
            var draw = [], last = false, This = this, line = compress ? '' : '\n', nodeCount = 0, maxDepth = 0;

            var notify = function (name, value, isLast, indent/*缩进*/, formObj) {
                nodeCount++;
                /*节点计数*/
                for (var i = 0, tab = ''; i < indent; i++)tab += indentChar;
                /* 缩进HTML */
                tab = compress ? '' : tab;
                /*压缩模式忽略缩进*/
                maxDepth = ++indent;
                /*缩进递增并记录*/
                if (value && value.constructor == Array) {/*处理数组*/
                    draw.push(tab + (formObj ? ('"' + name + '":') : '') + '[' + line);
                    /*缩进'[' 然后换行*/
                    for (var i = 0; i < value.length; i++)
                        notify(i, value[i], i == value.length - 1, indent, false);
                    draw.push(tab + ']' + (isLast ? line : (',' + line)));
                    /*缩进']'换行,若非尾元素则添加逗号*/
                } else if (value && typeof value == 'object') {/*处理对象*/
                    draw.push(tab + (formObj ? ('"' + name + '":') : '') + '{' + line);
                    /*缩进'{' 然后换行*/
                    var len = 0, i = 0;
                    for (var key in value)len++;
                    for (var key in value)notify(key, value[key], ++i == len, indent, true);
                    draw.push(tab + '}' + (isLast ? line : (',' + line)));
                    /*缩进'}'换行,若非尾元素则添加逗号*/
                } else {
                    if (typeof value == 'string')value = '"' + value + '"';
                    draw.push(tab + (formObj ? ('"' + name + '":') : '') + value + (isLast ? '' : ',') + line);
                }
                ;
            };
            var isLast = true, indent = 0;
            notify('', data, isLast, indent, false);
            return draw.join('');
        },
        send: function(formData){

            var defer = $q.defer();

            var params = {},
                output = '';
            formData.params.forEach(function(item){
                params[item.key] = item.value;
            })
            if(formData.method == 1){
                MockHttpService.get(formData.url, params, function(res){
                    output = JSON.stringify(res);
                    defer.resolve(output);
                }, function(err){
                    console.log(err);
                    defer.reject(err);
                });
            }else if(formData.method == 2){
                var body = {};
                formData.body.forEach(function(item){
                    body[item.key] = item.value;
                })
                MockHttpService.post(formData.url, body, function(res){
                    output = JSON.stringify(res);
                    defer.resolve(output);
                }, function(err){
                    console.log(err);
                    defer.reject(err);
                })
            }else if(formData.method == 3){
                var body = {};
                formData.body.forEach(function(item){
                    body[item.key] = item.value;
                })
                MockHttpService.patch(formData.url, params, body, function(res){
                    output = JSON.stringify(res);
                    defer.resolve(output);
                }, function(err){
                    console.log(err);
                    defer.reject(err);
                })
            }else if(formData.method == 4){
                MockHttpService.remove(formData.url, params, function(res){
                    output = JSON.stringify(res);
                    defer.resolve(output);
                }, function(err){
                    console.log(err);
                    defer.reject(err);
                })
            }

            return defer.promise;
        }
    }
}