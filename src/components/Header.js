import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.getNameFromUser = this.getNameFromUser.bind(this);
    this.state = {
      nameUser: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getNameFromUser();
  }

  async getNameFromUser() {
    const user = await getUser();
    this.setState({
      nameUser: user.name,
      loading: false,
    });
  }

  render() {
    const {
      nameUser,
      loading,
    } = this.state;
    return (
      loading ? <Loading />
        : (
          <header data-testid="header-component">
            <h3 data-testid="header-user-name">
              { nameUser }
            </h3>
            <Link to="/search" data-testid="link-to-search"> Search </Link>
            <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
            <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
          </header>)
    );
  }
}

export default Header;
