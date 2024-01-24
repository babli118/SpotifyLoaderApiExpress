import getPlayListUrl from "../libs/getPlayListUrl.js";

const getPlayListInfo = async (req, res) => {
  try {
    const songInfo = await getPlayListUrl(req);
    res.status(201).json(songInfo.songInfo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export { getPlayListInfo };
