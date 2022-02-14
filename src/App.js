import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route
          path="/"
          render={ () => <Login /> }
        />
        <Route
          path="/search"
          render={ () => <Search /> }
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
          path="/profile/edit"
          render={ () => <ProfileEdit /> }
        />
        <Route
          path="************"
          render={ () => <NotFound /> }
        />
      </BrowserRouter>
    );
  }
}

export default App;
