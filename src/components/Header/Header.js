import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@Components/Button';
import AuthStore from '@Lib/AuthStore';
import Icon from '@Components/Icon';
import connectComponent from '@App/lib/connect-component';
import { openModal } from '@Actions/uiActions';
import logo from '../../../public/logo.png';
import './Header.scss';

const buttonStyle = {
  width: '100px',
  height: '35px',
};

export class Header extends Component {
  state = {
    search: false,
  }

  handleClick = () => {
    this.setState({
      search: true,
    });
  };

  handleBlur = () => {
    this.setState({
      search: false,
    });
  }

  render() {
    const { search } = this.state;
    const { signIn, signUp } = this.props;
    return (
      <>
        <header className="header-top">
          <img className="logo" src={logo} alt="" />
          <div className="search">
            <div>
              <div>
                {search ? <input type="text" placeholder="Search..." onBlur={this.handleBlur} /> : ''}
              </div>
              <button
                type="button"
                className="searchButton"
                onClick={this.handleClick}
              >
                <Icon name="search" />
              </button>
            </div>
            <span style={search ? { transform: 'scaleX(1)' } : { transform: 'scaleX(0)' }}>{' '}</span>
          </div>
          {AuthStore.getToken()
            ? (
              <div className="action">
                <button className="notification" type="button" style={buttonStyle} onClick={this.handleClick}>
                  <Icon name="notification" />
                </button>
                <Button style={buttonStyle} handleClick={this.handleClick}>Upgrade</Button>
              </div>
            )
            : (
              <div className="action">
                <Button
                  datatest="loginButton"
                  label="sign in"
                  handleClick={signIn}
                  disabled={false}
                  type="button"
                  style={buttonStyle}
                  datatest="test"
                />
                <Button
                  datatest="signup-button"
                  label="sign up"
                  handleClick={signUp}
                  disabled={false}
                  type="button"
                  style={buttonStyle}
                />
              </div>
            )}
        </header>
        <div className="navigation">
          <ul>
            <Link to="/a">Technology</Link>
            <Link to="/a">Health</Link>
            <Link to="/a">Culture</Link>
            <Link to="/a">Science</Link>
            <Link to="/a">Fashion</Link>
            <Link to="/a">Education</Link>
            <Link to="/a">Lifestyle</Link>
            <Link to="/a">Nature</Link>
          </ul>
        </div>
      </>
    );
  }
}

Header.propTypes = {
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};

export default connectComponent(Header, {
  signIn: () => openModal('signin'),
  signUp: () => openModal('signup'),
});
