import $ from 'jquery';
import tpl from './tpl.js';
import courseList from './courseList.js';

module.exports = {
    verify: function(url, success, fail) {
        console.log(url);
        $.ajax({
            url: url,
            timeout: 5000,
            dataType: "jsonp",
            complete: function(jqXHR, textStatus) {
                console.log(jqXHR, textStatus, jqXHR.status);
                if (jqXHR.status == 200) {
                    success && success();
                } else {
                    fail && fail();
                }
            },
        })
    },
    dynamicLoading: {
        css: function(path) {
            if (!path || path.length === 0) {
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.href = path;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        },
        js: function(path) {
            if (!path || path.length === 0) {
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = path;
            script.type = 'text/javascript';
            head.appendChild(script);
        },
        ui: function(url, func) {
            $.ajax({
                url: url,
                success: function(data) {
                    $("body").append(data);
                    func && func();
                }
            });
        },
    },
    get: function(url, ret) {},
    refresh: function(id) {},
    tppl: function(tpl, data) {
        var fn = function(d) {
            var i, k = [],
                v = [];
            for (i in d) {
                k.push(i);
                v.push(d[i]);
            };
            return (new Function(k, fn.$)).apply(d, v);
        };
        if (!fn.$) {
            var tpls = tpl.split('[:');
            fn.$ = "var $=''";
            for (var t = 0; t < tpls.length; t++) {
                var p = tpls[t].split(':]');
                if (t != 0) {
                    fn.$ += '=' == p[0].charAt(0) ? "+(" + p[0].substr(1) + ")" : ";" + p[0].replace(/\r\n/g, '') + "$=$"
                }
                fn.$ += "+'" + p[p.length - 1].replace(/\'/g, "\\'").replace(/\r\n/g, '\\n').replace(/\n/g, '\\n').replace(/\r/g, '\\n') + "'";
            }
            fn.$ += ";return $;";
        }
        return data ? fn(data) : fn;
    },
    uiData: {
        netid: '',
        courseList: {},
        displayPage: 'Home',
        status: [],
    },
    sendStatus: function(text) {
    	var timestamp=Math.round(new Date().getTime()/1000);
    	func.uiData.status.unshift("[" + timestamp + "] " + text);
    	func.render();
    },
    render: function() {
        $("body").html(func.tppl(tpl, window.func.uiData));
        func.pubsub.emit('tpl_render');
    },
    pubsub: {
        client: {

        },
        listen: function(key, fn) {
            if (!this.client[key]) {
                this.client[key] = [];
            }
            this.client[key].push(fn);
        },
        clear: function(key) {
            this.client[key] = [];
        },
        emit: function() {
            var key = [].shift.apply(arguments);
            var fns = this.client[key];

            if (!fns || fns.length === 0) {
                return false;
            }

            for (var i = 0, fn; fn = fns[i++];) {
                console.log(fn);
                fn.apply(this, arguments);
            }
        },
    },
    getAvailableCourse: function() {
        for (var key in courseList) {
            var course = courseList[key];
            func.verify(course.url + func.uiData.netid,
                (function(obj) {
                    return function() {
                        func.uiData.courseList[obj.name] = obj;
                        func.pubsub.emit('data_update');
                    };
                }(course)),
                function() {
                    return;
                }
            );
        }
    },
    update: function(obj) {
    	func.sendStatus("Updating " + obj.name);
    },
    updateAll: function() {
    	for(var key in func.uiData.courseList) {
    		func.update(func.uiData.courseList[key]);
    	}
    },
};
