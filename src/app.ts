import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { authRouter, usersRouter } from "./routes/index.js";
import { errorMiddleware } from "./middleware/index.js";

const app = express();

app.use(morgan("common"));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use("/", (_req, res) => {
  res.send(
    `
  <h1>Welcome to Auth.js + Express Demo!</h1>
  <ol>
    <li>Sign in at <a href="/api/auth/signin">/api/auth/signin</a> </li>
    <li>Sign out at <a href="/api/auth/signout">/api/auth/signout</a> </li>
    <li>Access the current user at <a href="/api/users/me">/api/users/me</a> </li>
  </ol>
`
  );
});

app.use(errorMiddleware);

export { app };
