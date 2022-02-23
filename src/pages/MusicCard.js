import React from 'react';
import propTypes from 'prop-types';
import Loading from './Loading';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      loading: false,
      isFavorite: false,
    };
  }

  componentDidMount() {
    this.handleFavoriteSongs();
  }

  handleFavoriteSongs = async () => {
    const { trackId } = this.props;
    this.setState({
      loading: true,
    });
    const savedSongs = await getFavoriteSongs();
    this.setState({
      songs: savedSongs,
    }, () => {
      if (savedSongs) this.setState({ loading: false });
      const { songs } = this.state;
      const filterSong = songs.some((song) => song.trackId === trackId);
      this.setState({
        isFavorite: filterSong,
      });
    });
  }

    checkFavoriteSong = async (event) => {
      const { target: { checked } } = event;
      const { checkSong } = this.props;
      this.setState({
        loading: true,
        isFavorite: checked,
      });
      if (checked) await addSong(checkSong);
      if (!checked) await removeSong(checkSong);
      this.setState({ loading: false });
    }

    render() {
      const {
        previewUrl,
        trackName,
        checkSong,
        trackId,
        clickRemoved,
      } = this.props;
      const { isFavorite, loading } = this.state;
      return (
        loading ? <Loading />
          : (
            <div>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label htmlFor="favorite-music-checkbox">
                Favorita
                <input
                  id="favorite-music-checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  checked={ isFavorite }
                  type="checkbox"
                  onChange={ (event) => (
                    clickRemoved ? clickRemoved(checkSong)
                      : this.checkFavoriteSong(event)
                  ) }
                />
              </label>
            </div>)
      );
    }
}

MusicCard.propTypes = {
  previewUrl: propTypes.string.isRequired,
  trackName: propTypes.string.isRequired,
  // checkFavoriteSong: propTypes.func.isRequired,
  // checkIfFavoriteSong: propTypes.bool.isRequired,
  checkSong: propTypes.objectOf({
    previewUrl: propTypes.string.isRequired,
    trackName: propTypes.string.isRequired,
  }).isRequired,
  trackId: propTypes.number.isRequired,
  clickRemoved: propTypes.func.isRequired,
};

export default MusicCard;
