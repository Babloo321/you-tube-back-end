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

export default app;