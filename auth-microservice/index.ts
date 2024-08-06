index.ts

import { register } from "./src/controller/authController";

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json()); 
app.post('/api/register', register);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
