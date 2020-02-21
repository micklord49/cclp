import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CPLUserList from './CPLUserList';
import UserSearch from './UserSearch';
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';

export default class CPLUsers extends Component {
  constructor(props) {
      super(props);
      this.state = {
          opensearch: false,
          };
  }

  componentDidMount(){
  }

  addUser(guid)
  {
    console.log("Firing ControlPanelUserGroup.addUser");
    this.props.addUser(guid);
  }

  onCancelSearch()
  {
    this.setState({ opensearch: false});
  }

  onAddNewUser()
  {
    this.setState({ opensearch: true});
  }

  onRemoveUser(guid)
  {
    console.log("Firing ControlPanelUserGroup.onremoveuser");
    this.props.onremoveuser(guid);
  }

  render() 
  {    

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });
  
    return (
        <div>
            <Button startIcon={<AddIcon />} autoFocus color="inherit" onClick={()=>{this.onAddNewUser();}}>
                Add User
            </Button>
            <CPLUserList users={this.props.users} onremoveuser={(guid) => {this.onRemoveUser(guid);}} />
            <Dialog style={{zIndex:'4100'}} open={this.state.opensearch} onClose={()=>{this.onCancelSearch();}} >
                <AppBar style={{position: 'relative'}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={()=>{this.onCancelSearch();}} aria-label="close">
                    <CloseIcon />
                    </IconButton>
                    <div style={{flex: 1}}>
                    {this.state.edittitle}
                    </div>
                    <Button startIcon={<CancelIcon />} autoFocus color="inherit" onClick={()=>{this.onCancelSearch();}}>
                    Done
                    </Button>
                </Toolbar>
                </AppBar>
                <UserSearch addUser={(guid) => { this.addUser(guid)}} ></UserSearch>
            </Dialog>
        </div>
    );
  }
}


