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
var re = /\/([a-zA-Z0-9-]*)[\/_]{1}[a-zA-Z.]*$/g;
var netid = re.exec(url);
netid = netid ? netid[1] : null;

func.uiData['netid'] = netid;

$(document).ready(function() {

    func.render();

    func.sendStatus("UI has been rendered");

    /* every time data updated, rerender view */
    func.pubsub.listen('data_update', (function(fn){ return fn; }(func.render)));

    func.getAvailableCourse();

    setTimeout(func.updateAll, 1000);

});
