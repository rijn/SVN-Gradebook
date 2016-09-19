import $ from 'jquery';

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
    updateViewer: function(data) {
    	if(!data) data = this.uiData;
        $("span").each(function() {
            if ($(this).data("ui")) {
                $(this).html(data[$(this).data("ui")]);
            }
        })
    },

    uiData: {

    },

}
