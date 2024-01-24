import youtubesearchapi from "youtube-search-api";

const getFirstSong = async (name) => {
  try {
    console.log("name:", name);
    const ytSong = await youtubesearchapi.GetListByKeyword(
      `${name}`,
      [false],
      [1],
      ["Content-Type: application/json"]
    );

    let songYtId = ytSong.items[0];

    return { songYtId };
  } catch (error) {
    return (songYtId = error.message);
  }
};
export default getFirstSong;
