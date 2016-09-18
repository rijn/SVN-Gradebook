import $ from 'jquery';

module.exports =
{
    verify : function (url, success, fail)
    {
        console.log(url);
        $.ajax(
        {
            url : url,
            timeout : 5000,
            dataType : "jsonp",
            complete : function (jqXHR, textStatus)
            {
                console.log(jqXHR, textStatus, jqXHR.status);
                if (jqXHR.status == 200)
                {
                    success && success();
                } else {
                	fail && fail();
                }
            },
        }
        )
    },
    get : function (url, ret)  {},
    refresh : function (id)  {},
    updateViewer : function ()  {},

}
