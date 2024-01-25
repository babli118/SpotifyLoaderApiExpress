import getFirstSong from "../libs/getFirstSong.js";
import getDl from "../libs/getDl.js";

export const getSong = async (req, res) => {
  try {
    const name = decodeURIComponent(req.query.name);
    const ytIdInfo = await getFirstSong(name);

    const ytId = ytIdInfo.songYtId;
    const dlLink = await getDl(ytId);

    res.status(201).json(dlLink);
  } catch (error) {
    res
      .status(409)
      .json({ error: "Something unexpected happened, please try again" });
  }
};
