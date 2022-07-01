-- create database masima_3;
-- use masima_3;


-- create table users(
-- id int auto_increment,
-- primary key(id),
-- first_name varchar(50),
-- last_Name varchar(50),
-- Email varchar (30),
-- password varchar(30),
-- admin bool default false
-- );


-- create table Vacations(
-- id int auto_increment,
-- primary key(id),
-- destination varchar(50),
-- description text(300),
-- img text(300) default ("http://www.f-high.com/files/catalog/media/sap_vacation_in_Montenegro.jpg"),
-- starts_at date default now(),
-- ends_at date,
-- price int 
-- );

-- insert into users(first_name ,last_Name ,Email ,password)
-- values("Gabi", "Ashkenazi", "Gabi@.gmail.com","123456"),
-- ("Johnny ", "Tribiani", "Johnny@.gmail.com","iLoveFood"),
-- ("Bernie ", "Stinson", "Bernie@.gmail.com","00legendary00"),
-- ("Goku ", "son", "Goku@.gmail.com","741564AS46"),
-- ("Bo ", "Bennett", "Bo@.gmail.com","123asd456");

-- insert into Vacations(destination,description,ends_at,price,img)
-- values("Venice", "An amazing journey in Venice", "2022-03-02",4500,"https://www.elal.com/magazine/wp-content/uploads/2017/01/shutterstock_219076456.jpg" ),
-- ("Rome" , "journey in capital  Italy", "2022-03-13",2000, "https://www.lametayel.co.il/limages/0768f58416bfb16861e3b11b3d1d90c2.jpg?size=1200x627"),
-- ("Maldives" , "Relax on the beautiful beaches of Maldives", "2022-02-28",3000,"https://pix10.agoda.net/hotelImages/7458162/0/b516a92cb50c969a0834002737a4b068.jpg?ca=23&ce=0&s=1024x768"),
-- ("Tokyo" , "Experience the famous culture of Japan", "2022-03-04",5000,"https://media.istockphoto.com/photos/mt-fuji-and-tokyo-skyline-picture-id904453184?k=20&m=904453184&s=612x612&w=0&h=COFq7OBD_h8N84G6TcibIU7wGKzxVoxNcNqUa50f4ZM="),
-- ("Israel" , " A trip to the Holy Land came to see where it all started", "2022-04-05",4700,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBKqhG9QW5iRyyEgt581Nb_6LClVGma6NtBg&usqp=CAU"),
-- ("Berlin" , "The beer festival is Here!!!", "2022-04-10",3600,"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Berlin_Brandenburger_Tor_Abend.jpg/1200px-Berlin_Brandenburger_Tor_Abend.jpg" ),
-- ("Prague" , "Experience the culture of the Czech people", "2022-04-19",3500,"https://media.istockphoto.com/photos/prague-at-summer-day-picture-id1097810660?k=20&m=1097810660&s=612x612&w=0&h=JyHVVgNSpScj2f_xPyakQ1uJz44bz3jWiERdoO9DTYU="),
-- ("Hobbiton" , "Because no one lives as well as the Hobbits", "2022-09-19",3500,"https://i.insider.com/5575ac1969bedd063ee1f018?width=600&format=jpeg&auto=webp");


-- create table liks (
-- id int auto_increment,
-- primary key(id),
-- liked_by int,
-- foreign key(liked_by) references users(id),
-- vacation int,
-- foreign key(vacation) references Vacations(id)
-- );

-- insert into liks(liked_by,vacation)
-- values(1,1),(1,3),(1,6),
-- (2,5),(2,7),
-- (4,1),(4,2),(4,3),(4,4),
-- (5,3);

-- update users set admin= true where id = 3;
