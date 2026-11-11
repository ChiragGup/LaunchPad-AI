import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet"
import router from "./route/authRoute.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));




app.use(helmet());   
app.use(express.json());   

app.use(cookieParser());

app.use("/", router);

app.get("/", (req, res) => {
  res.send("LaunchPad AI Backend Running 🚀");
});

export default app;