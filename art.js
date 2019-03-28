require("dotenv").config();
var keys = require("./keys");
var moment = require('moment');
var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');

moment().format();

function Art() {

    var divider = "\n------------------------------------------------------------\n\n";

    this.findConcert = function (artist) {

        //URL for the bandsintown api
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        //Add 'Bands in Town Artist Events' api call here 
        axios.get(URL).then(function (response) {
            var data = response.data[0];

            var showData = [
                "Name: " + data.venue.name,
                "Location: " + data.venue.city,
                "Date: " + moment(data.datetime).format('DD MM YYYY')
            ].join("\n");

            //Print results to the console
            console.log(showData);
            //Store Results in the log.txt file
            fs.appendFile("log.txt", showData + divider, function (err) {
                if (err) throw err;
            });
        })


        //Info needed:
        //Name of Venue
        //Venue Location
        //Date of the event using moment to formate mm/dd/yyyy
    };

    this.findSongInfo = function (song) {

        //If no song is provided, the default is The Sign
        if (song === "") {
            song = "The Sign";
        };
        //Use node-spoity-api to call the spotify Api and get this info from the call
        var spotify = new Spotify(keys.spotify);

        spotify.search({
            type: 'track',
            query: song,
            limit: 5,
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var apiData = data.tracks.items[0];

            var showData = [
                "Band: " + apiData.artists[0].name,
                "Song: " + apiData.name,
                "Preview: " + apiData.preview_url,
                "Album: " + apiData.album.name
            ].join("\n");

            console.log(showData);
            fs.appendFile("log.txt", showData + divider, function (err) {
                if (err) throw err;
            });
        });

        //Artist
        //Song name
        //Previe link of song
        //Album song is from
    };

    this.findMovieInfo = function (movie) {
        //using axios node package, retrive the following info from the OMBD api
        //http://www.omdbapi.com/?apikey=[yourkey]&t + movie

        var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;

        axios.get(URL).then(function (response) {
            var data = response.data;

            var showData = [
                "Title: " + data.Title,
                "Year: " + data.Year,
                "IMDB Rating: " + data.imdbRating,
                "Rottem Tomatoes Rating: " + data.Ratings[1].Value,
                "Produced: " + data.Country,
                "Plot: " + data.Plot,
                "Actors: " + data.Actors,
            ]

            console.log(showData);
            fs.appendFile("log.txt", showData + divider, function (err) {
                if (err) throw err;
            });
        })

        //Title of the movie.
        //Year the movie came out.
        //IMDB Rating of the movie.
        //Rotten Tomatoes Rating of the movie.
        //Country where the movie was produced.
        //Language of the movie.
        //Plot of the movie.
        //Actors in the movie.
    };

    this.runRandomTxt = function () {
        //use the contents of random.txt to call liri's magical abilities to get info

        fs.readFile("./random.txt", function read(err, data) {
            if (err) {
                throw err;
            }
            console.log(data);
        });
    }
}

module.exports = Art;