import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import config from "./config.js";
import userRoutes from "./routes/userRoutes.js"

const PORT = config.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});