import app from "./server";
import config from "./config";
import * as dotenv from "dotenv";
dotenv.config();

app.listen(config.port, () => {
  console.log("Listening on http://localhost:3000");
});
