(function() {
  function AlbumCtrl(Fixtures) {

    this.albumData = Fixtures.getAlbum();
  }

    angular
      .module('blocJams')
      .controller('AlbumCtrl', AlbumCtrl);
      .controller('AlbumCtrl', ['Fitures', AlbumCtrl]);
})();
