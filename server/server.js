// index.js
import express from "express";
import cors from "cors";
import { connectAllClusters } from "./services/connections.js";
import { connectDB } from "./services/eventConnection.js";
import statsRouter from "./routers/statsRouter.js";
import eventsRouter from "./routers/eventRouter.js";
import paymentRouter from "./routers/paymentRouter.js";

const app = express();
app.use(express.json())
app.use(cors())

await connectDB();
await connectAllClusters();

app.use("/miv", statsRouter);
app.use("/miv/events", eventsRouter);
app.use("/miv/payments", paymentRouter);

export default app;
// app.listen(5000, () => {
//     console.log(`server is running on http://localhost:5000/`)
// })