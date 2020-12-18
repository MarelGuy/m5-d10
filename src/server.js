const express = require("express");
const server = express();
const cors = require("cors");
const movieRoutes = require("./services")
const {
    unauthorized,
    forbidden,
    notFound,
    badRequestHandler,
    catchAll
} = require("./errhandler")

const port = process.env.PORT || 3001

// Middlewares, they are always in the middle of the problems damn
server.use(express.json())
server.use(cors)

// Unic route, he's lonely. Poor guy, get him a friend
server.use("/movies", movieRoutes)

// Err handlers, try to not catch an error and you'll get deleted
server.use(unauthorized);
server.use(forbidden);
server.use(notFound);
server.use(badRequestHandler);
server.use(catchAll);

server.listen(port, () => {
    if (process.env.NODE_ENV === "production") {
        console.log("Running on cloud on port", port)
    } else {
        console.log("Running locally on port", port)
    }
})