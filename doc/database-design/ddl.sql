create table User
(
    uemail varchar(50) not null
        primary key,
    uname varchar(50) not null,
    nickname varchar(50) not null,
    password varchar(50) not null
);

create table Workspace
(
    wid int auto_increment
        primary key,
    wname varchar(50) not null,
    wdesc varchar(200) not null
);

create table Channel
(
    wid int not null,
    cname varchar(50) not null,
    ctype ENUM('public', 'private', 'direct') not null,
    ctime datetime not null,
    primary key (wid, cname),
    foreign key (wid) references Workspace (wid) on delete cascade ON UPDATE CASCADE
);

create table Message
(
    wid int not null,
    cname varchar(50) not null,
    uemail varchar(50) not null,
    mtime datetime not null,
    mcontent varchar(300) not null,
    primary key (wid, cname, uemail, mtime),
    foreign key (wid, cname) references Channel (wid, cname) on delete cascade ON UPDATE CASCADE,
    foreign key (uemail) references User (uemail) on delete cascade ON UPDATE CASCADE
);

create table cInvitation
(
    semail varchar(50) not null,
    remail varchar(50) not null,
    wid int not null,
    cname varchar(50) not null,
    citime datetime not null,
    primary key (semail, remail, wid, cname, citime),
    foreign key (semail) references User (uemail) on delete cascade ON UPDATE CASCADE,
    foreign key (remail) references User (uemail) on delete cascade ON UPDATE CASCADE,
    foreign key (wid, cname) references Channel (wid, cname) on delete cascade ON UPDATE CASCADE
);

create table cMember
(
    uemail varchar(50) not null,
    wid int not null,
    cname varchar(50) not null,
    primary key (uemail, wid, cname),
    foreign key (uemail) references User (uemail) on delete cascade ON UPDATE CASCADE,
    foreign key (wid, cname) references Channel (wid, cname) on delete cascade ON UPDATE CASCADE
);

create table wInvitation
(
    semail varchar(50) not null,
    remail varchar(50) not null,
    wid int not null,
    witime datetime not null,
    primary key (semail, remail, wid, witime),
    foreign key (semail) references User (uemail) on delete cascade ON UPDATE CASCADE,
    foreign key (remail) references User (uemail) on delete cascade ON UPDATE CASCADE,
    foreign key (wid) references Workspace (wid) on delete cascade ON UPDATE CASCADE
);

create table wMember
(
    uemail varchar(50) not null,
    wid int not null,
    wmtype ENUM('admin', 'user') not null,
    primary key (uemail, wid),
    foreign key (uemail) references User (uemail) on delete cascade ON UPDATE CASCADE,
    foreign key (wid) references Workspace (wid) on delete cascade ON UPDATE CASCADE
);


