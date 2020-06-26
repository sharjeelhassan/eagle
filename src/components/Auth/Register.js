import React, { Component } from 'react';
import firebase from '../../firebase';
import md5 from 'md5';
import {
  Grid,
  Icon,
  Header,
  Form,
  Segment,
  Button,
  Message,
  Transition,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    loading: false,
    visible: false,
    usersRef: firebase.database().ref('users'),
  };

  componentDidMount() {
    this.setState({ visible: true });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: 'Fill in all fields' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: 'Password is not valid' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log('user saved');
                this.setState({ loading: false });
              });              
            })
            .catch((err) => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false,
              });
            });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          });
        });
    }
  };

  saveUser = (createdUser) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? 'error'
      : '';
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading,
      visible,
    } = this.state;
    return (
      <Grid className='app' textAlign='center' verticalAlign='middle'>
        <Transition visible={visible} animation='drop' duration={1000}>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' icon color='violet' textAlign='center'>
              <Icon name='diamond' color='violet' />
              Register for Eagle
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  type='text'
                  name='username'
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  value={username}
                  className={this.handleInputError(errors, 'username')}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  type='email'
                  name='email'
                  icon='mail'
                  iconPosition='left'
                  placeholder='Email Address'
                  value={email}
                  className={this.handleInputError(errors, 'email')}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  type='password'
                  name='password'
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  value={password}
                  className={this.handleInputError(errors, 'password')}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  type='password'
                  name='passwordConfirmation'
                  icon='repeat'
                  iconPosition='left'
                  placeholder='Password Confirmation'
                  value={passwordConfirmation}
                  className={this.handleInputError(errors, 'password')}
                  onChange={this.handleChange}
                />
                <Button
                  disabled={loading}
                  className={loading ? 'loading' : ''}
                  color='violet'
                  fluid
                  size='large'
                >
                  Submit
                </Button>
              </Segment>
            </Form>
            {errors.length > 0 && (
              <Message error>
                <h3>Error</h3>
                {this.displayErrors(errors)}
              </Message>
            )}
            <Message>
              Already a user? <Link to='/login'>Login</Link>
            </Message>
          </Grid.Column>
        </Transition>
      </Grid>
    );
  }
}

export default Register;
