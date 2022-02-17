import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import { createUser } from './services/userAPI';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();
    this.nameInput = this.nameInput.bind(this);
    this.clickButton = this.clickButton.bind(this);

    this.state = {
      typedName: '',
      disabledSwitchLoginInput: true,
      loading: false,
      redirectToSearch: false,
    };
  }

  nameInput(event) {
    const three = 3;
    this.setState({
      disabledSwitchLoginInput: event.target.value.length < three,
      typedName: event.target.value,
    });
  }

  clickButton(event) {
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

  render() {
    const {
      disabledSwitchLoginInput,
      redirectToSearch,
      loading,
      typedName,
    } = this.state;
    return (
      <BrowserRouter>
        <Route
          path="/"
          render={ () => (
            <Login
              nameForLogin={ this.nameInput }
              disabledLogin={ disabledSwitchLoginInput }
              clickButtonLogin={ this.clickButton }
              redirectToSearch={ redirectToSearch }
              inputValue={ typedName }
              loading={ loading }
            />) }
        />
        <Route
          path="/search"
          render={ () => (
            <Search />) }
        />
        <Route
          path="/album/:id"
          render={ () => <Album /> }
        />
        <Route
          path="/favorites"
          render={ () => <Favorites /> }
        />
        <Route
          path="/profile"
          render={ () => <Profile /> }
        />
        <Route
          exact
          path="/profile/edit"
          render={ () => <ProfileEdit /> }
        />
        <Route
          path=""
          render={ () => <NotFound /> }
        />
      </BrowserRouter>
    );
  }
}

export default App;
