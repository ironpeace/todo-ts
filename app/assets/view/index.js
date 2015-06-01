/// <reference path="../underscore.d.ts" />
/// <reference path="../jquery.d.ts" />
var Task = (function () {
    function Task() {
    }
    return Task;
})();
$(function () {
    $("#alertArea").hide();
    $.ajax({
        dataType: "json",
        url: "/task/list",
        success: function (tasks) {
            console.log(tasks);
            setTodoList(tasks);
        }
    });
    $("form").submit(function (event) {
        event.preventDefault();
        var successFunc = function (tasks) {
            setTodoList(tasks);
            $("#contentIpt").val("");
        };
        $.ajax({
            dataType: "json",
            url: "/task/new?content=" + $("#contentIpt").val(),
            success: successFunc
        });
    });
    $(document).on('click', 'input.doneCheck', function () {
        console.log("checked");
        var id = $(this).attr("task-id");
        if ($(this).is(':checked')) {
            $.ajax({
                dataType: "json",
                url: "/task/" + id + "/complete",
                success: function (tasks) {
                    setTodoList(tasks);
                }
            });
        }
        else {
            $.ajax({
                dataType: "json",
                url: "/task/" + id + "/uncomplete",
                success: function (tasks) {
                    setTodoList(tasks);
                }
            });
        }
    });
    $(document).on('click', 'button.delTask', function () {
        var id = $(this).attr("task-id");
        $.ajax({
            dataType: "json",
            url: "/task/" + id + "/delete",
            success: function (tasks) {
                setTodoList(tasks);
                showAlert("Success to delete Task (id : " + id + ")");
            }
        });
    });
});
function setTodoList(tasks) {
    var todoRowTemplate = "\
    <ul class='list-group'> \
    <% _.each(tasks, function(task:Task) { %> \
        <li class='list-group-item'> \
            <input \
                task-id='<%= task.id %>' \
                type='checkbox' \
                class='doneCheck' \
                <% if (task.done) { %> checked <% }%>\
            >\
            <span class='<% if (task.done) { %>done<% }%>'><%= task.content %></span> \
            <button task-id='<%= task.id %>' type='button' class='btn btn-default btn-sm pull-right delTask'> \
                <span class='glyphicon glyphicon-remove' aria-hidden='true'></span> \
            </button> \
        </li> \
    <% }); %> \
    </ul> \
    ";
    var compiled = _.template(todoRowTemplate);
    $("#tasksArea").html(compiled({ "tasks": tasks }));
}
function showAlert(msg) {
    $("#alertArea").html("<span>" + msg + "</span>");
    $("#alertArea").show();
    hideAlert(5000);
}
function hideAlert(delay) {
    setTimeout(function () {
        $("#alertArea").hide();
    }, delay);
}
