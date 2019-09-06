import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import Modal from '@Components/Modal';
import Input from '@Components/Input';
import Button from '@Components/Button';
import connectComponent from '@Lib/connect-component';
import { closeModal } from '@Actions/uiActions';
import { createUser } from '@Actions/authActions';
import './SignUp.scss';
import {
  validate,
  emailSchema,
  passwordSchema,
  firstnameSchema,
  lastnameSchema,
  usernameSchema,
} from '@Utils/';

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      showPassword: false,
      showConfirm: false,
      errors: {},
      isFormValid: true,
    };
  }

  getSchema = (name) => {
    switch (name) {
      case 'password':
        return passwordSchema;
      case 'firstname':
        return firstnameSchema;
      case 'lastname':
        return lastnameSchema;
      case 'username':
        return usernameSchema;
      case 'email':
        return emailSchema;
      default:
        return null;
    }
  }

  handleChange = (e) => {
    const { password } = this.state;
    const { name, value } = e.target;
    const errors = {};
    if (name !== 'passwordConfirm') {
      const [errorValue] = validate({
        [name]: value,
      }, this.getSchema(name));
      errors[name] = errorValue || '';
    } else {
      errors[name] = this.confirmPassword(password, value);
    }
    this.setFormValidity(errors);
    this.setState({
      [name]: value,
      errors,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { signUp, history } = this.props;
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      errors,
    } = this.state;
    const formIsValid = this.validateForm();
    if (!formIsValid) {
      return this.setFormValidity(errors);
    }

    signUp({
      firstname,
      lastname,
      username,
      email,
      password,
    }, history);
  }

  validateForm = () => {
    const errors = {};
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      passwordConfirm,
    } = this.state;

    const [firstnameError] = validate({ firstname }, firstnameSchema);
    const [lastnameError] = validate({ lastname }, lastnameSchema);
    const [usernameError] = validate({ username }, usernameSchema);
    const [emailError] = validate({ email }, emailSchema);
    const [passwordError] = validate({ password }, passwordSchema);
    const passwordConfirmError = this.confirmPassword(password, passwordConfirm);

    errors.firstname = firstnameError || '';
    errors.lastname = lastnameError || '';
    errors.username = usernameError || '';
    errors.email = emailError || '';
    errors.password = passwordError || '';
    errors.passwordConfirm = passwordConfirmError || '';

    return this.setFormValidity(errors);
  }

  confirmPassword = (a, b) => (a === b ? '' : 'Passwords do not match');

  setFormValidity = (errors) => {
    let valid = true;
    Object.values(errors).forEach((value) => {
      if (value.length > 0) {
        valid = false;
      }
    });
    this.setState({ isFormValid: valid });

    return valid;
  }

  toggleVisibility = (field) => {
    this.setState(prevState => ({
      [field]: !prevState[field],
    }));
  }

  resetModal = () => {
    const { close } = this.props;
    this.setState({
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      showPassword: false,
      errors: {},
      isFormValid: true,
    });
    close();
  }

  render() {
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      passwordConfirm,
      showPassword,
      showConfirm,
      errors,
      isFormValid,
    } = this.state;
    const {
      ui: {
        loading,
        modalOpen,
        modal,
      },
    } = this.props;
    const loader = <Loader type="BallTriangle" color="#fff" height={18} width={79} />;

    return (
      <Modal close={this.resetModal} open={modalOpen && modal === 'signup'}>
        <div className="form">
          <h3 className="form-header">Join us now</h3>
          <p className="form-text">
            Create an account, follow the adventure everywhere anywhere
          </p>
          <form
            datatest="signup-form"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <Input
              name="firstname"
              value={firstname}
              type="text"
              handleChange={this.handleChange}
              placeholder="John"
              label="Firstname"
              error={errors.firstname}
            />
            <Input
              name="lastname"
              value={lastname}
              type="text"
              handleChange={this.handleChange}
              placeholder="Doe"
              label="Lastname"
              error={errors.lastname}
            />
            <Input
              name="username"
              value={username}
              type="text"
              handleChange={this.handleChange}
              placeholder="johnDoe123"
              label="Username"
              error={errors.lastname}
            />
            <Input
              id="email"
              name="email"
              value={email}
              type="email"
              handleChange={this.handleChange}
              placeholder="john.doe@foo.bar"
              label="Email"
              error={errors.email}
            />
            <Input
              id="password"
              name="password"
              value={password}
              type="password"
              handleChange={this.handleChange}
              placeholder="**********"
              label="Password"
              togglable
              visible={showPassword}
              handleToggle={() => this.toggleVisibility('showPassword')}
              error={errors.password}
            />
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              value={passwordConfirm}
              type="password"
              handleChange={this.handleChange}
              placeholder="**********"
              label="Confirm"
              togglable
              visible={showConfirm}
              handleToggle={() => this.toggleVisibility('showConfirm')}
              error={errors.passwordConfirm}
            />
            <Button
              datatest="signup-submit"
              label={loading ? null : 'create account'}
              handleClick={this.handleSubmit}
              disabled={loading ? true : !isFormValid}
              type="submit"
              style={{
                height: '45px',
                width: '300px',
                color: '#ffc700',
                backgroundColor: '#000',
                borderRadius: '0',
              }}
            >
              {loading && loader}
            </Button>
          </form>
          <div className="alternative-login">
            <p>Or create an account using:</p>
            <div className="social-login">
              <span>
                <i className="fab fa-google fa-lg" style={{ color: 'red' }} />
                Google
              </span>
              <span>
                <i className="fab fa-facebook fa-lg" style={{ color: 'blue' }} />
                Facebook
              </span>
            </div>
          </div>
          <div className="switch-context">
            <p>
              Have an account?
              {' '}
              <Link to="/">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Modal>
    );
  }
}

SignUp.propTypes = {
  ui: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    modalOpen: PropTypes.bool.isRequired,
    modal: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  close: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};

export default connectComponent(
  withRouter(SignUp), {
    close: closeModal,
    signUp: createUser,
  },
);