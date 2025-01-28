import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

// uses of middleware
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({limit:"16kb",extended:true}));  // when data comes to the url, it will be in json format,extended makes it nested(you can send nested data in url)
app.use(express.static("public"));    // to store static data use a seperate folder to store data folder name is anything
app.use(cookieParser());    // to store data in cookies of user data to retrive user data and stored in cookies it coulde be working with server only


// import router
import userRouter from "./routes/user.routes.js";

// use router
app.use("/api/v1/users",userRouter);

// import tweetRouter
import tweetRouter from './routes/tweet.routes.js';
app.use("/api/v1/tweets",tweetRouter);


// import videoRouter
import videoRouter from './routes/video.routes.js';
app.use("/api/v1/videos",videoRouter);


// import commentRouter
import commentRouter from './routes/comment.routes.js';
app.use("/api/v1/comments",commentRouter);
export default app;

// import playlistRouter
import playlistRouter from './routes/playlist.routes.js';
app.use("/api/v1/playlist",playlistRouter);

// import subscriptionRouter
import subscriptionRouter from './routes/subscription.routes.js';
app.use("/api/v1/subscriptions",subscriptionRouter);

// import likeRouter
import likeRouter from './routes/like.routes.js';
app.use("/api/v1/likes",likeRouter);

// import dashboard
import dashboardRouter from './routes/dashboard.routes.js';
app.use("/api/v1/dashboard",dashboardRouter);
/*
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import healthcheckRouter from "./routes/healthcheck.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"

//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/dashboard", dashboardRouter)

// http://localhost:8000/api/v1/users/register

export { app }
*/