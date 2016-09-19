import $ from 'jquery';
import tpl from './tpl.js'

var wu = wu || {};
wu.tmpl = function(tpl, data) {
    var fn = tpl.replace(/&lt;/g, '<').replace(/&gt;/g, '>') //    转义 <>
        .replace(/(<%=)([\s\S]*?)(%>)/g, '$1_html_+= ($2)\n$3') // <%= %>  [\s\S]允许换行
        .replace(/(<%)(?!=)([\s\S]*?)(%>)/g, '$1\n\t$2\n$3') // <% js code %>  (?!=)不要匹配到<%= %>
        .replace(/(^|%>|%>)([\s\S]*?)(<%=|<%|$)/g, function($, $1, $2, $3) { // 边界符外的html, html 中的(\|"|\r|\n) 要转义
            return '_html_+= "' + $2.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, '\\n') + '"\n'
        });
    return (fn = Function('data', 'with(data||{}){\nvar _html_=""\n' + fn + '\nreturn _html_\n}')), data ? fn(data) : fn
};

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
                // 支持 <pre> 和 [::] 包裹的 js 代码
                fn.$ += "+'" + p[p.length - 1].replace(/\'/g, "\\'").replace(/\r\n/g, '\\n').replace(/\n/g, '\\n').replace(/\r/g, '\\n') + "'";
            }
            fn.$ += ";return $;";
            // log(fn.$);
        }
        return data ? fn(data) : fn;
    },
    updateViewer: function() {
        $("body").html(this.tppl(tpl, this.uiData));
    },
    uiData: {

    },

}
