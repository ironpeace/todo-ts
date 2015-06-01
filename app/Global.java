import models.*;
import play.*;
import java.util.List;

public class Global extends GlobalSettings {
	public void onStart(Application app) {
        Logger.info("Application has started");
        List<Task> tasks = Task.find.all();
        if(tasks.size() == 0){
            Task t1 = new Task("Todo 1");
            t1.save();

            Task t2 = new Task("Todo 2");
            t2.save();

            Task t3 = new Task("Todo 3");
            t3.save();
        }
    }

    public void onStop(Application app) {
        Logger.info("Application shutdown...");
    }
}
