import app from "./server.ts";
import config from "./config";
import * as dotenv from "dotenv";
dotenv.config();

app.listen(config.port, () => {
  console.log("Listening on http://localhost:3000");
});
