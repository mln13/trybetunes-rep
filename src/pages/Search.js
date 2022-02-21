import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';

class Search extends React.Component {
  render() {
    const {
      disabledSwitchSearchInput,
      typedSearch,
      searchInput,
      findAlbumArtist,
      loading,
      searchList,
      listSearchInput,
    } = this.props;
    if (loading) { <Loading />; }
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="input-search-artist">
            <input
              id="input-search-artist"
              type="text"
              data-testid="search-artist-input"
              value={ typedSearch }
              onChange={ (event) => searchInput(event) }
            />
          </label>
          <button
            type="submit"
            disabled={ disabledSwitchSearchInput }
            data-testid="search-artist-button"
            onClick={ (event) => findAlbumArtist(event) }
          >
            Pesquisar
          </button>
        </form>
        <div>
          {`Resultado de álbuns de: ${listSearchInput}`}
          {searchList[0]
            ? searchList
              .map((album) => (
                <li key={ album.collectionId }>
                  <img src={ album.artworkUrl100 } alt="imagem-do-album" />
                  <p>{album.collectionName}</p>
                  <p>{album.artistName}</p>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    About
                  </Link>
                </li>))
            : (
              <h2>
                Nenhum álbum foi encontrado
              </h2>)}
        </div>
      </div>);
  }
}

Search.propTypes = {
  disabledSwitchSearchInput: propTypes.bool.isRequired,
  loading: propTypes.bool.isRequired,
  typedSearch: propTypes.string.isRequired,
  searchInput: propTypes.func.isRequired,
  findAlbumArtist: propTypes.func.isRequired,
  searchList: propTypes.arrayOf(propTypes.shape({
    artistId: propTypes.number,
    artistName: propTypes.string,
    collectionId: propTypes.number,
    collectionName: propTypes.string,
    collectionPrice: propTypes.number,
    artworkUrl100: propTypes.string,
    releaseDate: propTypes.string,
    trackCount: propTypes.number,
  })).isRequired,
  listSearchInput: propTypes.string.isRequired,
};

export default Search;
