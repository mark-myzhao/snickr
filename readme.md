# CS 6083 Project: Snickr

[![Build Status](https://travis-ci.com/alex-myzhao/snickr.svg?branch=master)](https://travis-ci.com/alex-myzhao/snickr)

## I. Project Overview
```bash
.
├── server-koa                      # Backend subproject
├── client-react                    # Frontend subproject
├── doc                             # Documentation files
├── .gitignore
├── LICENSE
└── readme.md
```

## II. Backend - Koa.js
We designed and implemented the snickr website based on [MVC](https://en.wikipedia.org/wiki/Model–view–controller) architectural pattern.

The `Model` and `Controller` are implemented within the Koa server, while the React frontend will take care of the `View`.

```bash
.
├── package.json                    # Define our project
├── index.js                        # Entry point to the app
├── server.js                       # Define & configure koa
├── /routes                         # Listen requests from clients
│   ├── index.js                    # Define the overall router
│   └── <route-name>.js             # Define the routers for each package
├── /controllers                    # The 'Controller' in MVC design
│   └── <route-name>-controller.js  # Define the logic for routes
├── /models                         # The 'Model' in MVC design
│   └── <model-name>.js             # Encapsulate the database models
├── /util                           # Useful tools for the project
├── /auth                           # Provide the OAuth 2.0 authorization
├── db.js                           # Configure the MySQL database
└── .env                            # Configure the environment variables
```

Also, we are using [RESTful APIs](https://en.wikipedia.org/wiki/Representational_state_transfer) for the API design.


## III. Frontend - React.js
```bash
.
├── package.json                    # Define our project
├── /src                            # Source code
│   ├── /components                 # Self-defined React components
│   ├── /images                     # SVG images
│   ├── index.[css|js]              # Entry point to the app
│   ├── App.[css|js]                # Root component
│   ├── App.test.js                 # Test code
│   ├── config.json                 # Global configuration
│   ├── routes.js                   # Router for pages
│   ├── serviceWorker.js            # Register a service worker
│   └── store.js                    # Manage the localStorage
└── /public                         # Public resources
    └── index.html                  # Placeholder for React
```


## IV. Solutions for Potential Problems

### 4.1 Solution for `ER_NOT_SUPPORTED_AUTH_MODE` error from MySQL server
[Solution for ER_NOT_SUPPORTED_AUTH_MODE](https://stackoverflow.com/questions/44946270/er-not-supported-auth-mode-mysql-server)
```SQL
USE koa;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```


## V. Related Tutorials
- JavaScript
    - [The Modern JavaScript Tutorial](https://javascript.info)
    - [MDN Java​Script](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- Node.js
    - [Node.js in 2018: Full stack tutorial](https://medium.com/jtribe/node-js-in-2018-full-stack-tutorial-with-koa-react-redux-sagas-and-mongodb-14a7efaee4d4)
- React.js
- Koa.js
    - [How To Use MySQL And Async/Await With Your Koa Node.js Application](https://blog.innermonkdesign.com/how-to-use-mysql-and-asyncawait-with-your-koa-node-js-application/)
- MySQL
    - [MySQL Cheet Sheet](https://devhints.io/mysql)
    - [Promise MySQL](https://www.npmjs.com/package/promise-mysql)
- REST
    - [Learn REST: A RESTful Tutorial](https://www.restapitutorial.com)
    - [What is REST](https://restfulapi.net)
- Authorization
    - [Learn how to handle authentication with Node using Passport.js](https://medium.freecodecamp.org/learn-how-to-handle-authentication-with-node-using-passport-js-4a56ed18e81e)
