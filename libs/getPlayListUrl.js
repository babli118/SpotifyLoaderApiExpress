import fetch from "isomorphic-unfetch";
import SpotifyUrlInfo from "spotify-url-info";

const { getData, getPreview, getTracks, getDetails } = SpotifyUrlInfo(fetch);

const getPlayListUrl = async (req, res) => {
  const id = req.query.id;
  let songInfoFetch = null;
  let albumInfoFetch = null;

  if (req.body.type === "playlist") {
    try {
      // Attempt to fetch song info
      songInfoFetch = await getDetails(
        `https://open.spotify.com/playlist/${id}`,
        {
          headers: {
            "user-agent": "googlebot",
          },
        }
      );

      // If song info fetch was successful, return the song info
      const songInfo = songInfoFetch;
      return { songInfo };
    } catch (Error) {
      res.status(404).json({ error: "Error fetching song and album info" });
    }
  }
  if (req.body.type === "album") {
    try {
      // If fetching song info failed, attempt to fetch album info
      albumInfoFetch = await getDetails(
        `https://open.spotify.com/album/${id}`,
        {
          headers: {
            "user-agent": "googlebot",
          },
        }
      );

      // Handle album info fetch error
      const songInfo = albumInfoFetch;
      console.log(songInfo); // Handle album info fetch error
      return { songInfo };
    } catch (error) {
      // Handle error if both song and album fetch fail
      res.status(404).json({ error: "Error fetching song and album info" });
    }
  }
  if (req.body.type === "artist") {
    try {
      // If fetching song info failed, attempt to fetch album info
      albumInfoFetch = await getDetails(
        `https://open.spotify.com/artist/${id}`,
        {
          headers: {
            "user-agent": "googlebot",
          },
        }
      );
      const songInfo = albumInfoFetch;

      return { songInfo };
    } catch (error) {
      // Handle error if both song and album fetch fail
      res.status(404).json({ error: "Error fetching song and album info" });
    }
  }
};

export default getPlayListUrl;
