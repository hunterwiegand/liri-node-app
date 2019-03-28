var Art = require("./art");

var art = new Art();

//  var spotify = new spotify(keys.spotify);

var command = process.argv[2];

var searchTerm = process.argv.splice(3).join("+");

switch (command) {

    case "concert-this":
        art.findConcert(searchTerm);
        break;

    case "spotify-this-song":
        art.findSongInfo(searchTerm);
        break;

    case "movie-this":
        art.findMovieInfo(searchTerm);
        break;

    case "do-what-it-says":
        art.runRandomTxt();
        break;
    default:
        console.log("Please try again using the correct commands: 'concert-this', 'spotify-this-song', 'movie-this', or 'do-what-it-says'.");
}
