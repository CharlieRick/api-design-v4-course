import express from "express";
import router from "./router.ts";
import morgan from "morgan";
import { protect } from "./modules/auth.ts";
import { createUser, signIn } from "./handlers/user.ts";

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

export default app;
