import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.gettingUser();
  }

  gettingUser = async () => {
    const userAPI = await getUser();

    this.setState({
      loading: false,
      user: userAPI,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading />
          : (
            <div>
              <br />
              <Link to="/profile/edit">
                Editar perfil
              </Link>
              <br />
              <img
                data-testid="profile-image"
                src={ user.image }
                alt="imagem do usuário"
              />
              <h3>
                {user.name}
              </h3>
              <h3>
                {user.email}
              </h3>
              <h3>
                {user.description}
              </h3>
            </div>)}
      </div>
    );
  }
}

export default Profile;
