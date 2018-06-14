-- Table creation and dummy data for testing
create table entry (
	id serial primary key,
	"description" varchar(80),
	"date" date,
	"hours" int,
	"project_id" int references project
);

create table project (
	id serial primary key,
	"name" varchar(100)
);


insert into project ("name")
values
('Time-tracker'),
('Spotify playlist manager'),
('Star Wars Text-based Game');

insert into entry ("description", "date", "hours", "project_id")
values
('Built out server-side scripts', '06/14/2018', 3, 1),
('Tested database connectivity', '06/14/2018', 1, 1),
('Built out SQL database for project', '06/14/2018', 2, 1),
('Read online API documentation', '05/30/2018', 1, 2),
('Read up on REACT framework to decide if app should be built with REACT', '5/31/2018', 1, 2),
('World-building', '5/24/2018', 2, 3),
('Plotted narrative', '5/26/2018', 3, 3);