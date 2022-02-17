import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';

class Login extends React.Component {
  render() {
    const {
      nameForLogin,
      disabledLogin,
      clickButtonLogin,
      redirectToSearch,
      loading,
      inputValue,
    } = this.props;

    if (loading) {
      return <Loading />;
    }
    return (
      redirectToSearch ? <Redirect to="/search" />
        : (
          <div data-testid="page-login">
            <form>
              <label htmlFor="input-name">
                <input
                  id="input-name"
                  type="text"
                  data-testid="login-name-input"
                  value={ inputValue }
                  onChange={ (event) => nameForLogin(event) }
                />
              </label>
              <button
                id="login-button"
                data-testid="login-submit-button"
                type="submit"
                disabled={ disabledLogin }
                onClick={ (event) => {
                  clickButtonLogin(event);
                } }
              >
                Entrar
              </button>
            </form>
          </div>)
    );
  }
}

Login.propTypes = {
  nameForLogin: propTypes.func.isRequired,
  clickButtonLogin: propTypes.func.isRequired,
  disabledLogin: propTypes.bool.isRequired,
  loading: propTypes.bool.isRequired,
  redirectToSearch: propTypes.bool.isRequired,
  inputValue: propTypes.string.isRequired,
};

export default Login;
