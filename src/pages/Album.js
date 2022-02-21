import propTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.musicsFromAlbum = this.musicsFromAlbum.bind(this);

    this.state = {
      musics: [],
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
    });
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div data-testid="artist-name">
          <h3>{musics[0].artistName}</h3>
        </div>
        <div data-testid="album-name">
          <h4>{musics[0].collectionName}</h4>
        </div>
        {musics.map((music) => <li key={ music }>{music}</li>)}
      </div>
    );
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
