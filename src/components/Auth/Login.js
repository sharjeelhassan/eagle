import React, { Component } from 'react';
import firebase from '../../firebase';
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

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false,
    visible: false,
  };

  componentDidMount() {
    this.setState({ visible: true });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((signedInUser) => {
          console.log(signedInUser);
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  isFormValid = ({ email, password }) => email && password;

  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? 'error'
      : '';
  };

  render() {
    const { email, password, errors, loading, visible } = this.state;
    return (
      <Grid className='app' textAlign='center' verticalAlign='middle'>
        <Transition
          visible={visible}
          animation='horizontal flip'
          duration={1000}
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' icon color='violet' textAlign='center'>
              <Icon name='shekel' color='violet' />
              Login to Eagle
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
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
              Don't have an account? <Link to='/register'>Register</Link>
            </Message>
          </Grid.Column>
        </Transition>
      </Grid>
    );
  }
}

export default Login;
