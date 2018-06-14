create table entry (
	id serial primary key,
	"description" varchar(80),
	"date" date,
	"hours" int
);

create table project (
	id serial primary key,
	"name" varchar(100)
);

create table project_entry (
	entry_id int references entry,
	project_id int references project,
	primary key (entry_id, project_id)
);