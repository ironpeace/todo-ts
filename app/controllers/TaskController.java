package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import play.libs.Json;
import models.*;

public class TaskController extends Controller {

    public static Result create(String content) {
    	Task td = new Task(content);
    	td.save();
    	return ok(Json.toJson(Task.find.all()));
    }

    public static Result list() {
    	return ok(Json.toJson(Task.find.all()));
    }

    public static Result complete(Long id) {
    	Task td = Task.find.byId(id);
    	td.done = true;
    	td.save();
    	return ok(Json.toJson(Task.find.all()));
    }

    public static Result uncomplete(Long id) {
    	Task td = Task.find.byId(id);
    	td.done = false;
    	td.save();
    	return ok(Json.toJson(Task.find.all()));
    }

    public static Result delete(Long id) {
    	Task.find.byId(id).delete();
    	return ok(Json.toJson(Task.find.all()));
    }

}
