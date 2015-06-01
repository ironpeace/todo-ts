/// <reference path="../underscore.d.ts" />
/// <reference path="../jquery.d.ts" />

class Task {
	id: number;
	content: string;
    done: boolean;
}

$(() => {

    $("#alertArea").hide();

	$.ajax({
		dataType: "json",
		url: "/task/list",
		success: (tasks: Array<Task>) => {
            console.log(tasks);
            setTodoList(tasks);
		}
	});

    $("form").submit(function(event){
        event.preventDefault();

        var successFunc = (tasks: Array<Task>) => {
            setTodoList(tasks);
            $("#contentIpt").val("");
        };

        $.ajax({
            dataType: "json",
            url: "/task/new?content=" + $("#contentIpt").val(),
            success: successFunc
        });
    });

    $(document).on('click', 'input.doneCheck', function(){
        console.log("checked");
        var id = $(this).attr("task-id");
        if ($(this).is(':checked')) {
            $.ajax({
                dataType: "json",
                url: "/task/" + id + "/complete",
                success: (tasks: Array<Task>) => {
                    setTodoList(tasks);
                }
            });
        } else {
            $.ajax({
                dataType: "json",
                url: "/task/" + id + "/uncomplete",
                success: (tasks: Array<Task>) => {
                    setTodoList(tasks);
                }
            });
        }
    });

    $(document).on('click', 'button.delTask', function(){
        var id = $(this).attr("task-id");
        $.ajax({
            dataType: "json",
            url: "/task/" + id + "/delete",
            success: (tasks: Array<Task>) => {
                setTodoList(tasks);
                showAlert("Success to delete Task (id : " + id + ")");
            }
        });
    });
});

function setTodoList(tasks: Array<Task>) {

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
    $("#tasksArea").html(compiled({"tasks":tasks}));
}

function showAlert(msg:String) {
    $("#alertArea").html("<span>" + msg + "</span>");
    $("#alertArea").show();
    hideAlert(5000);
}

function hideAlert(delay:number) {
    setTimeout(function(){
        $("#alertArea").hide();
    },delay);
}