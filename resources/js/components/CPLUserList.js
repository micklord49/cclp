import React, { Component } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import UserChip from './UserChip';

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
  
  

export default class CPLUserList extends Component {
  constructor(props) {
      super(props);
      this.state = {role: new Array()};
      this.onRemoveUser = this.onRemoveUser.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
  }


  onRemoveUser(guid)
  {
    this.props.onremoveuser(guid);
  }

  render() 
  {
    let users="";

    const mycontainerstyle ={ 
      maxHeight: 100,
      minHeight: 100,
      overflowX: "hidden",
      overflowY: "scroll",    
      display: "flex",  
    };


    if(this.props.users != null)
    {
        users = this.props.users.map(user => (
                <UserChip key={user.guid} guid={user.guid} ondelete={()=>{this.onRemoveUser(user.guid);}}/>
            ))
    }

    return (
        <div style={mycontainerstyle}>
            {users}
        </div>
    );
  }
}

