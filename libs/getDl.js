const getDl = async (ytId) => {
  try {
    const apiUrl = "http://localhost:9000/api/json";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const requestBody = {
      url: `https://www.youtube.com/watch?v=${ytId}`,
      aFormat: "mp3",
      dubLang: false,
      isAudioOnly: true,
      isNoTTWatermark: false,
      filenamePattern: "basic",
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
