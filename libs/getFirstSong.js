import { MusicClient } from "youtubei";

const getFirstSong = async (name) => {
  const music = new MusicClient();

  let SongName;
  let SongAuthor;
  let SearchName;

  const separator = "SongAuthor";

  // Find the index of the separator
  const separatorIndex = name.indexOf(separator);

  if (separatorIndex !== -1) {
    // Extract words before and after the separator
    SongName = name.substring(0, separatorIndex);
    SongAuthor = name.substring(separatorIndex + separator.length);
    SearchName = SongName + " " + SongAuthor;
  } else {
    console.log("Separator not found in the input string.");
  }
  try {
    const shelves = await music.search(SearchName);
    // Find the item whose name contains the specified name
    let maxMatchCount = 0;
    let ytMusicId = null;

    // Split the name into individual words
    const nameWords = SongName.trim().toLowerCase().split(" ");

    // Iterate through shelves
    for (let shelf of shelves) {
      // Check if shelf and shelf.items exist
      if (shelf && shelf.items) {
        // Iterate through items in shelf.items
        for (let item of shelf.items) {
          if (item && item.title) {
            const lowerCaseTitle = item.title.trim().toLowerCase();
            let matchCount = 0;

            // Iterate through each word in the song name
            for (let word of nameWords) {
              // Check if the word exists in the item title
              if (lowerCaseTitle.includes(word)) {
                matchCount++;
              }
            }

            // Update ytMusicId if current item has more matches
            if (matchCount > maxMatchCount) {
              maxMatchCount = matchCount;
              if (item && item.hasOwnProperty("artists")) {
                const songId = item.id;
                ytMusicId = songId;
              } else {
                console.log(
                  "Object is not of type MusicSongCompact or does not have an id."
                );
              }
              // console.log(item.id);
            }
          }
        }
      }
    }

    let songYtId = ytMusicId;
    return { songYtId };
  } catch (error) {
    return (songYtId = error.message);
  }
};
export default getFirstSong;
