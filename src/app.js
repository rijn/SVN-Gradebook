import 'babel-polyfill';
import $ from 'jquery';

$('<h1>Gradebook</h1>').appendTo('body');

/* parse netid from url */
var url = window.location.href;
var re = /\/([a-zA-Z0-9-]*)\/[a-zA-Z.]*$/g;
var netid = re.exec(url);
netid = netid ? netid[1] : null;
netid="yb3";
console.log(netid);

$('<h3>netid: ' + netid + '<h3>').appendTo('body');

const ul = $('<ul></ul>').appendTo('body');
const ul_courseList = $('#courseList');

import courseList from './courseList.js';
import func from './func.js';

console.log(courseList)

for (var key in courseList)
{
    var course = courseList[key];
    func.verify(course.url + netid,
        (function (name, obj) {
            return function(){
            	console.log(name, obj);
            	$('<a class="item"></a>').text(name).appendTo(obj)
            };
        }(course.name, ul)),
        function(){return;})
    // $('<li></li>').text(course.name).appendTo(ul);
}
