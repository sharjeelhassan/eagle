import React, { Component } from 'react';
import { Icon, Header, Grid } from 'semantic-ui-react';

class Messages extends Component {
  render() {
    return (
      <div>
        <Grid className='app' textAlign='center' verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Icon name='dashboard' color='violet' size='massive' />
            <Header as='h1' color='voilet' textAlign='center'>
              Eagle Framework Dashboard
            </Header>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Messages;
