# React Context API Demo

Basic demo to show the usage of the React context API with authentication flow

Project Structure:

```sh
    -server
        -src
            -data
                -schemas
            -logic
            -routes
            -utils
        -index.js
        -.env

    -client
        -public
        -src
            -components
            -pages
            -providers
            -services
            -utils
            -App.js
            -index.js
        -.env
```

System Requirements:

-   Node
-   Mongodb

Server:

1. Install the project dependencies

```sh
$ npm i
```

2. Create the .env file on the root of the server/ folder

```sh
$ touch .env
```

.env

```sh
DB_URL=mongodb://localhost:27017/your-database
PORT=5000
TOKEN_SECRET=your-secret
TOKEN_EXP=3h
```

3. Start the Server

```sh
$ npm start
```

Client:

1. Download dependencies

```sh
$ npm i
```

2. Create the .env file on the root of the client/ folder

```sh
$ touch .env
```

.env

```sh
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

\*Note: In order to enviroment variables work with this react project without touching any config file they all have to start with \*\*REACT_APP\*\*

3. Start the client

```sh
$ npm start
```

Author: [http://github.com/mikelpmc](http://github.com/mikelpmc)
