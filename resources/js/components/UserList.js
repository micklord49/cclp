import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarBorder';

import UserCard from './UserCard';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }));
  
  

export default class UserList extends Component {
  constructor(props) {
      super(props);
      this.state = {role: new Array()};
      //this.handleChangeName = this.handleChangeName.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(e){
    this.setState({
      name: e.target.value
    })
  }

  componentDidMount(){
  }


  

  render() 
  {
    let users="";

    const mycontainerstyle ={ 
      maxHeight: 200,
      minHeight: 200,
      overflowX: "scroll",
      overflowY: "hidden",    
      display: "flex",  
    };


    if(this.props.users != null)
    {
        users = this.props.users.map(user => (
                <UserCard key={user.guid} guid={user.guid} />
            ))
        console.log('Rendered '+this.props.users.length+' UserCard(s).');
    }

    return (
        <div style={mycontainerstyle}>
            {users}
        </div>
    );
  }
}

