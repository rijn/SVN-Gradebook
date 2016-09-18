import 'babel-polyfill';
import $ from 'jquery';

$('<h1>Cats</h1>').appendTo('body');
const ul = $('<ul></ul>').appendTo('body');

import courseList from './courseList.js'

for (const course of courseList)
{
    $('<li></li>').text(course.name).appendTo(ul);
}
