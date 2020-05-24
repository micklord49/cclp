import React, { Component } from 'react';
import axios from 'axios';

import Fade from '@material-ui/core/Fade';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import { withStyles, useTheme } from '@material-ui/core/styles';

const useStyles = theme => ({
  card: {
    maxWidth: 275,
    minWidth: 275,
    marginBottom:10,
    marginLeft:10,
  },
  media: {
    maxWidth: "100%",
    height: "auto",
  },
  image: {
    maxWidth: 275,
    height: 100,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class UserChip extends Component {
  constructor(props) {
      super(props);
      this.state = {guid: '', checked: true, image: ""};
      this.ondelete = this.ondelete.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount()
  {
    axios.get("/userdir/" + this.props.guid + "/edit")
    .then(response => {
      this.setState({  name: response.data.name });
      this.setState({  image: response.data.image });
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
    
    const { classes } = this.props;
    
    return (
      <Fade in={this.state.checked}>
        <Chip
            avatar={<Avatar alt={this.state.name} src={this.state.image} />}
            label={this.state.name}
            style={{ margin: 5}}
            onDelete={() => { this.ondelete();}}
        />

        </Fade>
    );
  }
}

export default withStyles(useStyles)(UserChip)