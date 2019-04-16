# CS 6083 Project

## Backend Design - MVC
- `package.json` defines your project from nodes perspective, change project details and dependencies here.
- `index.js` is your entry point to the app.
- `server.js` is where koa has been defined and configured
- `routes/index.js` is where your routes are defined
- `routes/<route-name>.js` is where you’ll set up a route
- `controllers/<route-name>.js` is where you’ll define the logic for your routes
- `models` is where you’ll configure your database models
- React will be take care of our view layer

## Solution for `ER_NOT_SUPPORTED_AUTH_MODE` error of MySQL server
```SQL
USE koa;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

## Quick Search
- [Promise MySQL](https://www.npmjs.com/package/promise-mysql)

## References
- [Node.js in 2018: Full stack tutorial](https://medium.com/jtribe/node-js-in-2018-full-stack-tutorial-with-koa-react-redux-sagas-and-mongodb-14a7efaee4d4)
- [How To Use MySQL And Async/Await With Your Koa Node.js Application](https://blog.innermonkdesign.com/how-to-use-mysql-and-asyncawait-with-your-koa-node-js-application/)
- [MySQL Cheet Sheet](https://devhints.io/mysql)
- [ER_NOT_SUPPORTED_AUTH_MODE]https://stackoverflow.com/questions/44946270/er-not-supported-auth-mode-mysql-server
