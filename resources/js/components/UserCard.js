import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import IconButton from '@material-ui/core/IconButton';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles, useTheme } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = theme => ({
  card: {
    maxWidth: 275,
    marginBottom:10,
    marginLeft:10,
  },
  media: {
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

class UserCard extends Component {
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
    console.log("Firing UserCard.ondelete");
    this.props.ondelete();
  }

  render() 
  {
    
    const { classes } = this.props;
    
    return (
      <Fade in={this.state.checked}>
        <Card className={classes.card}>
              <CardHeader
                  action={
                  <IconButton aria-label="settings" onClick={() => { this.ondelete();}}>
                      <DeleteIcon />
                  </IconButton>
                  }
                  title={this.state.name}
              />
              <CardMedia
                className={classes.media}
                src={this.state.image}
                title="Paella dish"
                >
                <img src={this.state.image} />
            </CardMedia>
          </Card>
        </Fade>
    );
  }
}

export default withStyles(useStyles)(UserCard)