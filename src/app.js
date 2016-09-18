import 'babel-polyfill';
import $ from 'jquery';

$('<h1>Cats</h1>').appendTo('body');

/* parse netid from url */
var url = window.location.href;
var re = /\/([a-zA-Z0-9-]*)\/[a-zA-Z.]*$/g;
var netid = re.exec(url);
netid = netid ? netid[1] : null;
console.log(netid);

$('<h3>netid: ' + netid + '<h3>').appendTo('body');

const ul = $('<ul></ul>').appendTo('body');

import courseList from './courseList.js'
import func from './func.js'

console.log(courseList)

for (var key in courseList)
{
    var course = courseList[key];
    func.verify(course.url + netid,
        (function () {
            return $('<li></li>').text(course.name).appendTo(ul);
        })(),
        null)
    // $('<li></li>').text(course.name).appendTo(ul);
}
