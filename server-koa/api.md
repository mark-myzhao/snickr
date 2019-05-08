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

