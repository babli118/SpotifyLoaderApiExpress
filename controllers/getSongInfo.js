import getSpotifyUrl from "../libs/getSpotifyUrl.js";

const getSongInfo = async (req, res) => {
  try {
    const songInfo = await getSpotifyUrl(req);
    res.status(201).json(songInfo.songInfo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export { getSongInfo };
