# API

## Workspace
```javascript
// -> GET /v1/workspace/:uemail
// <- 200 OK
ctx.ok({
    success: true,
    workspace: [
        {
            'wid': 1,
            'wname': 'W1',
            'wdesc': 'W1 desc'
        }, {
            'wid': 2,
            'wname': 'W2',
            'wdesc': 'W2 desc'
        }
    ]
})

// -> POST /v1/workspace/
{
    'wname': 'new workspace',
    'wdesc': 'new desc',
    'uemail': '...'
}
// <- 201 CREATED
ctx.created({
    success: true
})


// -> PUT  /v1/workspace/:wid
{
    'wname': 'new workspace',
    'wdesc': 'new desc'
}
// <- 200 OK
ctx.ok({
    success: true
})


// -> DELETE /v1/workspace/:wid
// <- 200 OK
ctx.ok({
    success: true
})
```

##wInvitation
```javascript
// -> POST /v1/winvitation/:wid
{
    'semail': 'send email',
    'remail': 'recieve email',
}
// <- 201 CREATED
ctx.created({
    success: true
})
```

##Channel
```javascript
// -> GET /v1/channel/:wid
// <- 200 ok
ctx.ok({
    success: true,
    channel: [
        {
            'cname': 'channel1',
            'ctype': 'public',
            'ctime': 'Sat Dec 08 2018 10:00:00 GMT-0500'
        }, {
            'cname': 'channel5',
            'ctype': 'privite',
            'ctime': 'Mon Oct 01 2018 10:00:00 GMT-0400'
        }
    ]
})


// -> POST /v1/channel/:wid
{
    'cname': 'channel9',
    'ctype': 'public'
}
// <- 201 CREATED
ctx.created({
    success: true
})


// -> DELETE /v1/channel/:cname
{
    'wid': 1
}
// <- 200 ok
```

##cInvitation
```javascript
// -> POST /v1/cinvitation/:cname
{
    'semail': 'send email',
    'remail': 'recieve email',
    'wid' : 1
}
// <- 201 CREATED
ctx.created({
    success: true
})


```

##Message
```javascript
// -> POST /v1/message/
{
    'wid': 1,
    'cname': 'channel1',
    'uemail' : '498973030@qq.com',
    'mcontent' : 'hello Colleoni!'
}
// <- 201 CREATED
ctx.created({
    success: true
})
```
##wMember  set wid = 1 in testcode
```javascript
//seek the member of this workspace
// -> GET /v1/wmember/:wid
// <- 200 OK
ctx.ok({
    success: true,
    member: {uemail, ,uname, nickname, wmtype}
})


// -> GET /v1/wmember/getwid/:uemail
// <- 200 ok 
ctx.ok({
    success: true,
    workspace: {wid, wmtype}
})

// -> POST /v1/wmember
{
    'uemail': 'sl9888@nyu.edu',
    'wid': 1,
    'wmtype': 'user'
}
// <- 201 CREATED
ctx.created({
    success: true
})


// -> PUT /v1/wmember/:uemail  SET wid =2 for test
{
    'wmtype': 'admin'
}
// <- 200 ok


// -> DELETE /v1/wmember/:uemail  SET wid =2 for test
// <- 200 ok
ctx.ok({
    success: true
})
```

##cMember
```javascript
// -> GET /v1/cmember/:uemail     get particular member in channel
// <- 200 OK
ctx.ok({
    success: true,
    memberinfo: {uenamil, wid, cname} 
})

// -> GET /v1/cmember   get all cmembers
// <- 200 OK
ctx.ok({
    success: true,
    memberinfo: {uenamil, wid, cname}
})

// -> GET /v1/cmember/getchannelmember/:cname  get the member in the particular channel   SET wid = 1 for test
// <- 200 ok 
ctx.ok({
    success: true,
    member: uemail
})


// -> POST /v1/cmember
{
    'uemail': 'jiaqi@gmail.com',
    'wid': 1,
    'cname': 'channel2'
}
// <- 201 CREATED
ctx.created({
    success: true
})


// -> DELETE /v1/cmember/:uemail
{
    'cname': 'channel2',
    'wid': 1,
}
// <- 200 ok
ctx.ok({
    success: true
})
```
