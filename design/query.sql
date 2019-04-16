# sql 1
insert into User value
('newuser@gmail.com', 'newuser', 'nu', '12345678');

#sql 2
insert into Channel value
(2, 'channel7', 'public', '2018-12-08 11:00:00');

#sql 3
select uemail, wid
from Workspace natural join wMember
where wmtype = 'admin'
group by uemail, wid;

#sql 4
select wid, cname, count(remail) as allnotin
from cInvitation natural join Channel
where timestampdiff(Day, (date_format(ctime,'%Y%m%d')),date_format(now(),'%Y%m%d')) > 5 and wid = 3 and Channel.ctype = 'public'
      and remail not in (
        select uemail
        from cMember
        where wid = 3 and cInvitation.cname = cMember.cname
    )
group by wid, cname;



#sql 5
select mcontent
from Channel natural join Message
where cname = 'channel1'
order by mtime;

#sql 6
select mcontent
from Message
where uemail = '498973030@qq.com';

#sql 7
select mcontent
from Message natural join cMember natural join wMember
where uemail = 'xz8888@nyu.edu' and mcontent like '%perpendicular%';
