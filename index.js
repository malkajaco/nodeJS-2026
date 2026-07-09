import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { MESSAGES } from "./src/utils/constants.js";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(MESSAGES.SERVER_RUNNING(PORT));
});
