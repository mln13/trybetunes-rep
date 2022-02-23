import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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

  musicsFromAlbum = async () => {
    const musics = await getFavoriteSongs();
    this.setState({
      musics,
      loading: false,
    });
  }

  clickToRemove = async (checkSong) => {
    this.setState({
      loading: true,
    });
    await removeSong(checkSong);
    this.musicsFromAlbum();
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
                  clickRemoved={ this.clickToRemove }
                />))}
          </div>)
    );
  }
}

export default Favorites;
