import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MessageList from './MessageList';
import MessageView from './MessageView';

export default class Messages extends Component {
  constructor(props) {
      super(props);
      this.state = {message: ''};
  }

  render() 
  {    
    return (
        <Grid container spacing={2} style={{paddingRight: 70}}>
            <Grid item xs={12}>
                <MessageList title={this.props.title} owner={this.props.owner} onSelect={(e,guid) => {this.setState({message: guid.guid});    console.log("Got change :"); console.log(guid);}} />
            </Grid>
            <Grid item xs={12}>
                <MessageView guid={this.state.message} />
            </Grid>
        </Grid>
    );
  }
}


