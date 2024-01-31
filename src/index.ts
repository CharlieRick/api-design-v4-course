import app from "./server.ts";
import * as dotenv from "dotenv";
dotenv.config();

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
