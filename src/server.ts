import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createUser, signIn } from "./handlers/user";
import errorHandler from "./handlers/error";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.secret_key = "supersecret";
  next();
});

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "hello friend" });
});

app.use("/api", protect, router);

app.post("/user", createUser);
app.post("/login", signIn);

app.use(errorHandler);

export default app;
