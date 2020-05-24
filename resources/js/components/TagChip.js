import React, { Component } from 'react';
import axios from 'axios';

import Fade from '@material-ui/core/Fade';
import Chip from '@material-ui/core/Chip';

export default class TagChip extends Component {
  constructor(props) {
      super(props);
      this.state = {guid: '', checked: true};
      // this.ondelete = this.ondelete.bind(this);
  }

  componentDidMount()
  {
    axios.get("/tag/" + this.props.guid)
    .then(response => {
      this.setState({  name: response.data.name });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  ondelete()
  {
    this.setState({ checked: false })
    this.props.ondelete();
  }

  render() 
  {
    return (
      <Fade in={this.state.checked}>
            <Chip
                label={this.state.name}
                style={{backgroundColor:'LightGreen', margin: 5}}
                onDelete={() => { this.ondelete();}}
            />
        </Fade>
    );
  }
}

