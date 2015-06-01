/// <reference path="../jquery.d.ts" />
var Task = (function () {
    function Task() {
    }
    return Task;
})();
console.log("start");
$(function () {
    $.ajax({
        dataType: "json",
        url: "/task/list",
        success: function (data) {
            console.log("success");
            console.log(data);
        }
    });
});
