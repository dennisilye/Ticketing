import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cors from "cors";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import * as dotenv from "dotenv";
import cookieSession from "cookie-session";
dotenv.config();

const app = express();
app.set("trust proxy", 1);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
    sameSite: 'none',

  })
);
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
