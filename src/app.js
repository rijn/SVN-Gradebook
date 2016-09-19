import 'babel-polyfill';
import $ from 'jquery';
window.$ = $;
window.jQuery = $;
import func from './func.js';
window.func = func;

func.pubsub.listen('tpl_render', function() {
    console.log('tpl_render');
});

func.dynamicLoading.css("https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.4/semantic.min.css");

/* parse netid from url */
var url = window.location.href;
var re = /\/([a-zA-Z0-9-]*)\/[a-zA-Z.]*$/g;
var netid = re.exec(url);
netid = netid ? netid[1] : null;

netid = 'yb3';

func.uiData['netid'] = netid;

import courseList from './courseList.js';

$(document).ready(function() {

    func.render();

    /* every time data updated, rerender view */
    func.pubsub.listen('data_update', (function(fn){ return fn; }(func.render)));

    const ul = $('<ul></ul>').appendTo('body');
    const ul_courseList = $('#courseList');

    console.log(courseList)

    for (var key in courseList) {
        var course = courseList[key];
        func.verify(course.url + netid,
            (function(name) {
                return function() {
                    func.uiData.courseList[name] = {};
                    func.pubsub.emit('data_update');
                };
            }(course.name)),
            function() {
                return;
            }
        );
    }

});
