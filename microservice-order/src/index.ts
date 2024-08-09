import cors from "cors";
import express from "express";
import { routerOrder } from "./routes/orderRoute";

const app = express();
const port = 8080;

app.use(express.json());
app.use("/api/orders", routerOrder);
app.use(cors());

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
