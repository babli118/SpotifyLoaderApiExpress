import getFirstSong from "../libs/getFirstSong.js";
import getDl from "../libs/getDl.js";

export const getSong = async (req, res) => {
  try {
    const duration = req.body.duration;
    const name = decodeURIComponent(req.query.name);
    const ytIdInfo = await getFirstSong(name, duration);

    const ytId = ytIdInfo.songYtId;
    const dlLink = await getDl(ytId);

    res.status(201).json(dlLink);
  } catch (error) {
    res
      .status(409)
      .json({ error: "Something unexpected happened, please try again" });
  }
};
