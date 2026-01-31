import mongoose from "mongoose";
import app from "./app.js";
import { config } from "./app/config/config.js";


async function main() {
  await mongoose.connect(config.db_uri as string);

  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};

main()
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));