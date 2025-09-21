// index.js
import express from "express";
import cors from "cors";
import { connectAllClusters } from "./services/connections.js";
import statsRouter from "./routers/statsRouter.js";

const app = express();
app.use(express.json())
app.use(cors())

await connectAllClusters();

app.use("/miv", statsRouter);

export default app;
// app.listen(5000, () => {
//     console.log(`server is running on http://localhost:5000/`)
// })