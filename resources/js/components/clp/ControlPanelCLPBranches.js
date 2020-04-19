import React, { Component } from 'react';
import axios from 'axios';


//
//  Library Components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddIcon from '@material-ui/icons/Add';

//
//  CCLP Components
import NavList from '../NavList';
import ControlPannelCLPBranchInfo from './ControlPanelCLPBranchInfo';

export default class ControlPanelCLPBranches extends Component {
  constructor(props) {
      super(props);
      this.state = {branches: new Array(), selectedbranch: '', 
      open: false, 
      newname: ''
    };
  }

  componentDidMount()
  {
    this.refresh();
  }

  handleClickOpen()
  {
    this.setState({open: true});
  };

  handleClose()
  {
    this.setState({open: false});
  };

  handleAddBranch()
  {
    this.setState({open: false});
    this.addnewbranch();
  };

  handleChange(e){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    this.setState({
      [name]: value
    });
  }

  handleChangeBody(text){
    this.setState({
      body: text
    })
  }

  refresh()
  {
    axios.get("/branch/dir/all")
          .then(response => {
            const items = response.data;
            this.setState({ branches: items,
                            selectedbranch: items[0] 
                          });
          })
          .catch(function (error) {
            console.log(error);
          })
  }

  branchselected(guid)
  {
    if(typeof(guid)=="undefined")                         return;
    if(typeof(this.state.selectedbranch)=="undefined")   return;
    if(this.state.selectedbranch.guid==guid)             return;

    this.state.branches.forEach(element => {
      if(element.guid==guid)
      {
        this.setState({ selectedbranch: element });
      }
    });
  }

  branchupdated()
  {
    this.refresh();
  }

  addnewbranch() 
  {
    const branch = {
      name: this.state.newname,
    }

    let uri = '/branch';
    axios.post(uri, branch).then((response) => {
          //this.props.history.push('/display-item');
          this.refresh();
    });
  }


  render() 
  {
    
    const neu = {
      backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop:10,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    const open = this.state.open;

    return (
      <div>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Button startIcon={<AddIcon />} onClick={() => {this.handleClickOpen();}} color="primary">Add New Branch</Button>
          <NavList items={this.state.branches} onSelect={(guid) => this.branchselected(guid)} />
        </Grid>
        <Grid item xs={9}>
          <ControlPannelCLPBranchInfo guid={this.state.selectedbranch.guid} onChange={(e) => {this.branchupdated(e);}} />
        </Grid>
      </Grid>
      <Dialog open={open} onClose={()=>{this.handleClose();}} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new Branch</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Add a new branch to your CLP.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="wardname"
                label="Branch Name"
                type="text"
                fullWidth
                name="newname"
                onChange={(e) => {this.handleChange(e);}}
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {this.handleClose();}} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => {this.handleAddBranch();}} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
  }
}

