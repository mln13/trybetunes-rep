import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.musicsFromAlbum();
  }

  componentDidUpdate() {
    this.musicsFromAlbum();
  }

  musicsFromAlbum = async () => {
    const musics = await getFavoriteSongs();
    this.setState({
      musics,
      loading: false,
    });
  }

  render() {
    const { musics, loading } = this.state;
    return (
      loading ? <Loading />
        : (
          <div data-testid="page-favorites">
            <Header />
            {musics
              .map((song) => (
                <MusicCard
                  key={ song.trackId }
                  trackId={ song.trackId }
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  checkSong={ song }
                  checkFavoriteSong={ this.checkFavoriteSong }
                />))}
          </div>)
    );
  }
}

export default Favorites;
