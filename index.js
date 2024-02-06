import helmet from "helmet";
import songRoutes from "./routes/song.js";
import songDlRoutes from "./routes/songDl.js";
import playListRoutes from "./routes/playList.js";
import express from "express";
import mm from "music-metadata";
import NodeID3 from "node-id3";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
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
  console.log(`Server is running on port ${PORT}`);
});
