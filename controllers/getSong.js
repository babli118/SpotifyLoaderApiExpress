import getFirstSong from "../libs/getFirstSong.js";
import getDl from "../libs/getDl.js";

export const getSong = async (req, res) => {
  try {
    const duration = req.body.duration;
    const name = decodeURIComponent(req.query.name);
    let SongName;
    let SongAuthor;
    const separator = "SongAuthor";

    // Find the index of the separator
    const separatorIndex = name.indexOf(separator);

    if (separatorIndex !== -1) {
      // Extract words before and after the separator
      SongName = name.substring(0, separatorIndex);
      SongAuthor = name.substring(separatorIndex + separator.length);
    } else {
      console.log("Separator not found in the input string.");
    }
    const ytIdInfo = await getFirstSong(name, duration);

    const ytId = ytIdInfo.songYtId;
    const dlLink = await getDl(ytId, SongName, SongAuthor);

    res.status(201).json(dlLink);
  } catch (error) {
    res
      .status(409)
      .json({ error: "Something unexpected happened, please try again" });
  }
};
