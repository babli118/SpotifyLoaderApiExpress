import fetch from "isomorphic-unfetch";
import SpotifyUrlInfo from "spotify-url-info";

const { getData, getPreview, getTracks, getDetails } = SpotifyUrlInfo(fetch);

const getSpotifyUrl = async (req, res) => {
  const id = req.query.id;
  try {
    const songInfoFetch = await getDetails(
      `https://open.spotify.com/track/${id}`,
      {
        headers: {
          "user-agent": "googlebot",
        },
      }
    );
    const songInfo = songInfoFetch;
    return { songInfo };
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export default getSpotifyUrl;
