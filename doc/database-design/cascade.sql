alter table Channel
add constraint chfk foreign key (wid) references Workspace(wid) on DELETE cascade;

alter table Message
add constraint mfk foreign key (wid, cname) references Channel(wid, cname) on DELETE cascade;

alter table Message
add constraint mfk2 foreign key (uemail) references User(uemail) on DELETE cascade;

alter table cInvitation
add constraint cifk foreign key (semail) references User(uemail) on DELETE cascade;

alter table cInvitation
add constraint cifk2 foreign key (remail) references User(uemail) on DELETE cascade;

alter table cInvitation
add constraint cifk3 foreign key (wid, cname) references Channel(wid, cname) on DELETE cascade;

alter table cMember
add constraint cmfk foreign key (uemail) references User(uemail) on DELETE cascade;

alter table cMember
add constraint cmfk2 foreign key (wid, cname) references Channel(wid, cname) on DELETE cascade;

alter table wInvitation
add constraint wifk foreign key (semail) references User(uemail) on DELETE cascade;

alter table wInvitation
add constraint wifk2 foreign key (remail) references User(uemail) on DELETE cascade;

alter table wInvitation
add constraint wifk3 foreign key (wid) references Workspace(wid) on DELETE cascade;

alter table wMember
add constraint wmfk foreign key (uemail) references User(uemail) on DELETE cascade;

alter table wMember
add constraint wmfk2 foreign key (wid) references Workspace(wid) on DELETE cascade;