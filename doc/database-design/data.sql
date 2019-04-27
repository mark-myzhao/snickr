INSERT INTO User (uemail, uname, nickname, password) VALUES 
('498973030@qq.com', 'Mingyu Zhao', 'Alex', '123891828'),
('hangbo@gmail.com', 'hangbo', 'hangbo', '12345678'),
('jiaqi@gmail.com', 'lee', 'lee', '12345678'),
('mingyusysu@gmail.com', 'mingyu', 'mingyu', '12345678'),
('newuser@gmail.com', 'newuser', 'mu', '12345678'),
('sl9888@nyu.edu', 'Shuyi Lu', 'Shuyi', 'sadad'),
('xz8888@nyu.edu', 'Xiahao Zhang', 'Haohao', '213jkhdf'),
('yl1234@nyu.edu', 'Yunian Pan', 'Pan', '12134fsafsad'),
('zh2333@nyu.edu', 'Zhenghan He', 'Zhenghan', 'xsjahfjdmnfkjd');
    
INSERT INTO Workspace (wid, wname, wdesc) VALUES 
(1, 'w1', 'perpendicular elevator'),
(2, 'w2', 'perpendicular TV'),
(3, 'w3', 'Panda Express'),
(4, 'w4', 'The Wei'),
(5, 'w5', 'Li Yuan'),
(6, 'w6', 'Target');
    
INSERT INTO Channel (wid, cname, ctype, ctime) VALUES 
(1, 'channel1', 'public', '2018-12-08 10:00:00'),
(1, 'channel2', 'public', '2019-01-08 10:00:00'),
(2, 'channel7', 'public', '2018-12-08 11:00:00'),
(3, 'channel3', 'public', '2018-12-08 10:00:00'),
(3, 'channel6', 'public', '2018-10-08 20:00:00'),
(4, 'channel4', 'direct', '2019-03-07 10:00:00'),
(5, 'channel5', 'private', '2018-10-01 10:00:00');
    
INSERT INTO Message (wid, cname, uemail, mtime, mcontent) VALUES 
(1, 'channel1', 'xz8888@nyu.edu', '2018-12-01 10:00:00', 'I love you Lee'),
(1, 'channel1', 'xz8888@nyu.edu', '2018-12-01 15:00:00', 'abs perpendicular abs'),
(1, 'channel1', 'yl1234@nyu.edu', '2018-12-09 10:20:00', 'I love you Haohao'),
(1, 'channel2', '498973030@qq.com', '2019-01-18 11:00:00', 'Shuyi lost his dad forever'),
(1, 'channel2', '498973030@qq.com', '2019-02-09 01:00:00', 'Shuyi wastes food again'),
(1, 'channel2', 'xz8888@nyu.edu', '2019-01-09 05:00:00', 'Shuyi call Mingyu dad, so she find new dad'),
(3, 'channel3', '498973030@qq.com', '2018-12-09 01:00:00', 'Haohao falls in love with Lee'),
(3, 'channel3', '498973030@qq.com', '2018-12-18 11:00:00', 'Haohao comes to see Lee again'),
(3, 'channel6', '498973030@qq.com', '2018-10-09 12:00:00', 'Hangbo is the most handsome man in 16r'),
(3, 'channel6', '498973030@qq.com', '2018-10-18 20:00:00', 'Shuyi is a bad girl'),
(4, 'channel4', 'jiaqi@gmail.com', '2019-03-07 10:30:00', 'Shuyi comes to 16r for dinner'),
(5, 'channel5', '498973030@qq.com', '2018-10-02 10:00:00', 'Shuyi says Jiaqi loudly');
    
INSERT INTO cInvitation (semail, remail, wid, cname, citime) VALUES 
('498973030@qq.com', 'hangbo@gmail.com', 3, 'channel3', '2019-01-01 10:00:00'),
('498973030@qq.com', 'mingyusysu@gmail.com', 3, 'channel3', '2019-01-05 10:00:00');

INSERT INTO wInvitation (semail, remail, wid, witime) VALUES 
('498973030@qq.com', 'sl9888@nyu.edu', 1, '2019-01-01 10:00:00'),
('yl1234@nyu.edu', 'sl9888@nyu.edu', 1, '2019-01-02 10:00:00');
    
INSERT INTO wMember (uemail, wid, wmtype) VALUES 
('498973030@qq.com', 1, 'admin'),
('498973030@qq.com', 2, 'user'),
('498973030@qq.com', 3, 'user'),
('hangbo@gmail.com', 1, 'user'),
('hangbo@gmail.com', 3, 'admin'),
('jiaqi@gmail.com', 1, 'user'),
('jiaqi@gmail.com', 2, 'user'),
('jiaqi@gmail.com', 4, 'admin'),
('mingyusysu@gmail.com', 1, 'user'),
('mingyusysu@gmail.com', 2, 'admin'),
('mingyusysu@gmail.com', 3, 'user'),
('xz8888@nyu.edu', 1, 'user'),
('yl1234@nyu.edu', 1, 'admin'),
('yl1234@nyu.edu', 2, 'user'),
('yl1234@nyu.edu', 5, 'admin'),
('yl1234@nyu.edu', 6, 'admin'),
('zh2333@nyu.edu', 1, 'user'),
('zh2333@nyu.edu', 2, 'user'),
('zh2333@nyu.edu', 3, 'user'),
('zh2333@nyu.edu', 4, 'user');
    
INSERT INTO cMember (uemail, wid, cname) VALUES 
('498973030@qq.com', 1, 'channel1'),
('xz8888@nyu.edu', 1, 'channel1'),
('yl1234@nyu.edu', 1, 'channel1'),
('zh2333@nyu.edu', 1, 'channel1'),
('498973030@qq.com', 1, 'channel2'),
('xz8888@nyu.edu', 1, 'channel2'),
('498973030@qq.com', 3, 'channel3'),
('498973030@qq.com', 3, 'channel6'),
('jiaqi@gmail.com', 4, 'channel4'),
('xz8888@nyu.edu', 4, 'channel4'),
('498973030@qq.com', 5, 'channel5');