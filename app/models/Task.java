package models;

import javax.persistence.*;

import play.db.ebean.*;
import play.data.validation.Constraints.Required;

@SuppressWarnings("serial")
@Entity
public class Task extends Model {
	@Id
	public Long id;

	@Required
	public String content;

	public Boolean done = false;

	public Task(String content) {
		this.content = content;
	}

	public static Finder<Long, Task> find
		= new Finder<Long, Task>(Long.class, Task.class);
	
}
