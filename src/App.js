import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import { createUser } from './services/userAPI';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import searchAlbumsAPI from './services/searchAlbumsAPI';

class App extends React.Component {
  constructor() {
    super();
    this.nameInput = this.nameInput.bind(this);
    this.clickButtonLogin = this.clickButtonLogin.bind(this);
    this.searchInput = this.searchInput.bind(this);
    this.findAlbumArtist = this.findAlbumArtist.bind(this);
    this.state = {
      typedName: '',
      typedSearch: '',
      listSearchInput: '',
      disabledSwitchLoginInput: true,
      disabledSwitchSearchInput: true,
      loading: false,
      redirectToSearch: false,
      list: [],
    };
  }

  nameInput(event) {
    const three = 3;
    this.setState({
      disabledSwitchLoginInput: event.target.value.length < three,
      typedName: event.target.value,
    });
  }

  searchInput(event) {
    this.setState({
      disabledSwitchSearchInput: event.target.value.length < 2,
      typedSearch: event.target.value,
      listSearchInput: event.target.value,
    });
  }

  clickButtonLogin(event) {
    const { typedName } = this.state;
    event.preventDefault();
    this.setState({
      loading: true,
    });
    createUser({ name: typedName });
    this.setState({
      redirectToSearch: true,
      loading: false,
      typedName: '',
    });
  }

  async findAlbumArtist(event) {
    event.preventDefault();
    const { typedSearch } = this.state;
    const albumArtistList = await searchAlbumsAPI(typedSearch);
    this.setState({
      loading: true,
    },
    () => {
      const searchList = albumArtistList
        .filter((album) => album.artistName.includes(typedSearch));
      this.setState({
        loading: false,
        typedSearch: '',
        list: searchList,
      });
    });
  }

  render() {
    const {
      disabledSwitchLoginInput,
      disabledSwitchSearchInput,
      redirectToSearch,
      loading,
      typedName,
      typedSearch,
      list,
      listSearchInput,
    } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (
              <Login
                nameForLogin={ this.nameInput }
                disabledLogin={ disabledSwitchLoginInput }
                clickButtonLogin={ this.clickButtonLogin }
                redirectToSearch={ redirectToSearch }
                inputValue={ typedName }
                loading={ loading }
              />) }
          />
          <Route
            exact
            path="/search"
            render={ () => (
              <Search
                disabledSwitchSearchInput={ disabledSwitchSearchInput }
                typedSearch={ typedSearch }
                searchInput={ this.searchInput }
                findAlbumArtist={ this.findAlbumArtist }
                loading={ loading }
                searchList={ list }
                listSearchInput={ listSearchInput }
              />) }
          />
          <Route
            exact
            path="/album/:id"
            render={ (props) => (
              <Album
                { ...props }
              />) }
          />
          <Route
            exact
            path="/favorites"
            render={ () => <Favorites /> }
          />
          <Route
            exact
            path="/profile"
            render={ () => <Profile /> }
          />
          <Route
            exact
            path="/profile/edit"
            render={ () => <ProfileEdit /> }
          />
          <Route
            exact
            path=""
            render={ () => <NotFound /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
