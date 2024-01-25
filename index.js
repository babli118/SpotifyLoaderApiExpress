import express from "express";
import helmet from "helmet";
import songRoutes from "./routes/song.js";
import songDlRoutes from "./routes/songDl.js";
import playListRoutes from "./routes/playList.js";

const app = express();

app.use(helmet());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow any origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/songInfo", songRoutes);
app.use("/playListInfo", playListRoutes);
app.use("/songDl", songDlRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port 3001`);
});
