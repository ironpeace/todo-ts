/// <reference path="../jquery.d.ts" />

class Task {
	id: number;
	content: string;
}

console.log("start");

$(() => {
	$.ajax({
		dataType: "json",
		url: "/task/list",
		success: (data:Array<Task>) => {
			console.log("success");
			console.log(data);
		}
	});
});