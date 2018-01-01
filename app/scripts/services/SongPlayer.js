(function() {
    function SongPlayer(Fixtures) {
      var SongPlayer = {};
/**
*@desc loads and stores album information
*@param {Object}
*/
      var currentAlbum = Fixtures.getAlbum();
/**
*@desc Buzz object audio file
*@param {Object}
*/
      var currentBuzzObject = null;

/**@function playSong
*@desc song playing behavior (encapsulated)
*@param {Object} song
*/

      var playSong = function(song) {
          currentBuzzObject.play();
          song.playing = true;
        };

/**@function stopSong
*@desc stops song playing behavior (encapsulated)
*@param {Object} song
*/
      var stopSong = function(song){
        currentBuzzObject.stop();
        song.playing = null;
      };

/**
*@function setSong
*@desc Stops currently playing song and loads new audio file as currentBuzzObject
*@param {Object} songs
*/
      var setSong = function(song) {
        if (currentBuzzObject) {
            stopSong(SongPlayer.currentSong);
        }

        currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });

    SongPlayer.currentSong = song;
  };

  /**
  *@function getSongIndex
  *@desc tracks the index of song from a list
  *@param {Object} songs
  *@returns {Number}
  */
      var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
      };
  /**
  *@desc Active song object from list of songs
  *@param {Object}
  */
        SongPlayer.currentSong = null;
/**
*@function SongPlayer.playing
*@desc plays currently loaded or selected song info when needed.
*@param {Object} song
 */
      SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) {
          setSong(song);
          playSong(song);
          song.playing = true;
          } else if (SongPlayer.currentSong === song) {
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
          song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

/**
*@function SongPlayer.previous
*@desc returns to the previous track or restarts the current track
*@param {Object} song
*@returns {Number} -1
*/
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);

            } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
            }
        };
/**
*@function SongPlayer.next
*@desc skips to the next track on list or album
*@param {Object} song
*@returns {Number} +1
*/
        SongPlayer.next = function(){
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

          if (currentSongIndex >= currentAlbum.songs.length) {
            stopSong(SongPlayer.currentSong);
            
          } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
          }
      };

      return SongPlayer;
    }
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
  })();
