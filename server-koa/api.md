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
// -> POST /v1/Channel/:wid
{
    'semail': 'send email',
    'remail': 'recieve email',
}
// <- 201 CREATED
ctx.created({
    success: true
})
```

