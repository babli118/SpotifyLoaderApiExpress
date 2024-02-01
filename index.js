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

app.post("/api/embed-metadata", async (req, res) => {
  try {
    const { mp3Url, title, artist, album, coverImageUrl } = req.body;

    // Download the MP3 file
    const response = await fetch(mp3Url);
    if (!response.ok) {
      throw new Error("Failed to download MP3 file");
    }
    const mp3Buffer = await response.buffer();

    // Read metadata from the downloaded MP3 file
    const metadata = await mm.parseBuffer(mp3Buffer, "audio/mpeg");

    // Update metadata
    metadata.common.title = title;
    metadata.common.artist = artist;
    metadata.common.album = album;

    // Download the cover image
    const coverImageResponse = await fetch(coverImageUrl);
    if (!coverImageResponse.ok) {
      throw new Error("Failed to download cover image");
    }
    const coverImageBuffer = await coverImageResponse.buffer();

    // Embed the cover image
    const modifiedBuffer = NodeID3.write(
      {
        ...metadata.common,
        image: {
          mime: "image/jpeg",
          type: { id: 3, name: "front cover" },
          description: "Thumbnail",
          imageBuffer: coverImageBuffer,
        },
      },
      mp3Buffer
    );

    if (!modifiedBuffer) {
      throw new Error("Failed to embed metadata and cover image");
    }

    // Send the modified MP3 file to the client
    res.set("Content-Disposition", 'attachment; filename="modified_song.mp3"');
    res.set("Content-Type", "audio/mpeg");
    res.send(modifiedBuffer);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
