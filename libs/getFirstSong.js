import { MusicClient } from "youtubei";

const getFirstSong = async (name, duration) => {
  const seconds = duration / 1000;
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
    console.log(SearchName);
    const shelves = await music.search(SearchName);
    console.log(shelves[2]);

    let ytMusicId = null;
    // Iterate through shelves
    for (let shelf of shelves) {
      // Check if shelf and shelf.items exist
      if (shelf && shelf.items) {
        // Iterate through items in shelf.items
        for (let item of shelf.items) {
          if (
            item &&
            item.title &&
            item.duration > seconds - 3 &&
            item.duration < seconds + 3
          ) {
            console.log("first item🎁🤢🤔", item);
            ytMusicId = item.id;
            break;
          }
        }
      }
    }
    if (ytMusicId === null) {
      const Secondshelve = await music.search(SongName);

      for (let shelf of Secondshelve) {
        // Check if shelf and shelf.items exist
        if (shelf && shelf.items) {
          // Iterate through items in shelf.items
          for (let item of shelf.items) {
            if (
              item &&
              item.duration > seconds - 10 &&
              item.duration < seconds + 10
            ) {
              console.log("second:✔✔✔", item);
              ytMusicId = item.id;
              break;
            }
          }
        }
      }
    }
    if (ytMusicId === null) {
      const thirdshelve = await music.search(name);

      for (let shelf of thirdshelve) {
        // Check if shelf and shelf.items exist
        if (shelf && shelf.items) {
          // Iterate through items in shelf.items
          for (let item of shelf.items) {
            if (
              item &&
              item.duration > seconds - 10 &&
              item.duration < seconds + 10
            ) {
              console.log("second:✔✔✔", item);
              ytMusicId = item.id;
              break;
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
