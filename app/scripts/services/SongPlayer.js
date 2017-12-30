(function() {
    function SongPlayer() {
      var SongPlayer = {};
/**
*@desc currentSong is the audio file that is currently playing
*@type {Object}
*/
      var currentSong = null;
/**
*@desc Buzz object audio file
*@type {Object}
*/
      var currentBuzzObject = null;

/**@function playSong
*@desc song playing behavior encapsulated
*@param {Object} song
*/

      var playSong = function(song) {
          currentBuzzObject.play();
          song.playing = true;
        };

/**
*@function setSong
*@desc Stops currently playing song and loads new audio file as currentBuzzObject
*@param {Object} songs
*/
      var setSong = function(song) {
        if (currentBuzzObject) {
            currentBuzzObject.stop();
            currentSong.playing = null;
        }

        currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });

    currentSong = song;
  };
/**
*@function SongPlayer.playing
*@desc plays currently loaded or selected song info when needed.
*@param {Object} song
 */
      SongPlayer.play = function(song) {
        if (currentSong !== song) {
          setSong(song);
          playSong(song);
          song.playing = true;
          } else if (currentSong === song) {
              if (currentBuzzObject.isPaused()) {
                  playSong(song);
              }
          }
   };
   /**
   *@function SongPlayer.pause
   *@desc pauses currently loaded or selected song info when needed.
   *@param {Object} song
    */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };

      return SongPlayer;
    }
    angular
        .module('blocJams')
        .factory("SongPlayer", SongPlayer);
  })();
