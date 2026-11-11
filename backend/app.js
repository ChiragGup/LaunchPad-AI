import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet"
import router from "./route/authRoute.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://launch-pad-ai-bay.vercel.app",
    "https://launch-pad-penn9nglp-chirag-4e81.vercel.app"
  ],
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