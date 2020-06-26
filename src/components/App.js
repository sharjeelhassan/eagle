import React, { Component } from 'react';
import './App.css';
import { Transition, Grid, Header, Icon } from 'semantic-ui-react';

import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

class App extends Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    this.setState({ visible: true });
  }

  render() {
    const { visible } = this.state;
    return (
      <Grid className='app' columns='equal' style={{ background: '#eee' }}>
        <ColorPanel />
        <SidePanel />
        <Transition visible={visible} animation='browse right' duration={1000}>
          <Grid.Column style={{ marginLeft: 320 }}>
            <Messages />            
          </Grid.Column>
        </Transition>
        <Grid.Column width={4}>
          <MetaPanel />
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
