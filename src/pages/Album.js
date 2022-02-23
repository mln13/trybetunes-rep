import propTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.musicsFromAlbum = this.musicsFromAlbum.bind(this);
    // this.checkFavoriteSong = this.checkFavoriteSong.bind(this);
    // this.checkIfFavoriteSong = this.checkIfFavoriteSong.bind(this);

    this.state = {
      musics: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.musicsFromAlbum();
  }

  async musicsFromAlbum() {
    const { match } = this.props;
    const musics = await getMusics(match.params.id);
    this.setState({
      musics,
      loading: false,
    });
  }

  // checkFavoriteSong(song) {
  //   this.setState({
  //     loading: true,
  //   }, () => {
  //     addSong(song);
  //     this.setState((prevState) => ({
  //       loading: false,
  //       favoriteSongs: [...prevState.favoriteSongs, song],
  //     }));
  //   });
  // }
  // checkIfFavoriteSong(song) {
  //   const { favoriteSongs } = this.state;
  //   const favorite = favoriteSongs
  //     .some((favoriteFromArray) => song.trackId === favoriteFromArray.trackId);
  //   return favorite;
  // }

  render() {
    const { musics, loading } = this.state;
    return (
      loading ? <Loading />
        : (
          <div data-testid="page-album">
            <Header />
            <div data-testid="artist-name">
              <h3>{musics[0].artistName}</h3>
            </div>
            <div data-testid="album-name">
              <h4>{musics[0].collectionName}</h4>
            </div>
            {musics
              .filter((music) => music.trackName)
              .map((song) => (
                <MusicCard
                  key={ song.trackId }
                  trackId={ song.trackId }
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  checkSong={ song }
                  checkFavoriteSong={ this.checkFavoriteSong }
                  // checkIfFavoriteSong={ this.checkIfFavoriteSong(song) }
                />))}
          </div>
        ));
  }
}

Album.propTypes = {
  match: propTypes.objectOf({
    params: propTypes.objectOf({
      id: propTypes.string,
    }),
  }).isRequired,
};

export default Album;
