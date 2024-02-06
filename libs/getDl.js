const getDl = async (ytId, SongName, songAuthor) => {
  try {
    const apiUrl = `https://dl01.spotifyloader.com/api/json`;
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const requestBody = {
      url: `https://music.youtube.com/watch?v=${ytId}`,
      aFormat: "mp3",
      dubLang: false,
      isAudioOnly: true,
      isNoTTWatermark: false,
      filenamePattern: "basic",
      name: SongName.includes("(")
        ? SongName.substring(0, SongName.indexOf("(")).trim()
        : SongName.trim(),
      author: songAuthor,
    };

    const dlLinkReq = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    });
    const dlLink = await dlLinkReq.json();
    return { dlLink };
  } catch (error) {
    console.log(error);
  }
};
export default getDl;
