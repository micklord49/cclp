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
//  Icons
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarBorder';

//
//  CCLP Components
import NavList from './NavList';
import ControlPannelCLPCouncil from './ControlPanelCLPCouncil';


export default class ControlPanelCLPCouncils extends Component {
  constructor(props) {
      super(props);
      this.state = {councils: new Array(), selectedcouncil: '', open: false};
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

  handleAddCouncil()
  {
    this.setState({open: false});
  };


  refresh()
  {
    axios.get("/councils/dir/all")
          .then(response => {
            const items = response.data;
            this.setState({ councils: items,
                            selectedcouncil: items[0] 
                          });
          })
          .catch(function (error) {
            console.log(error);
          })
  }

  councilselected(guid)
  {
    if(typeof(guid)=="undefined")
    {
      console.log("Council not defined yet");
      return;
    }
    if(typeof(this.state.selectedcouncil)=="undefined")
    {
      console.log("My council not set");
      return;
    }
    if(this.state.selectedcouncil.guid==guid) 
    {
      console.log("Council already selected.");
      return;
    }
    this.props.councils.forEach(element => {
      if(element.guid==guid)
      {
        this.setState({ selectedcouncil: element });
      }
    });
  }

  councilupdated(guid)
  {
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
          <Button startIcon={<AddIcon />} onClick={() => {this.handleClickOpen();}} color="primary">Add New Council</Button>
          <NavList items={this.state.councils} onSelect={(guid) => this.councilselected(guid)} />
        </Grid>
        <Grid item xs={9}>
          <ControlPannelCLPCouncil council={this.state.selectedcouncil.guid} onChange={() => this.councilupdated()} />
        </Grid>
      </Grid>
      <Dialog open={open} onClose={()=>{this.handleClose();}} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new Council</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Add a new council to your CLP. This shold be a local government council in your CLP as defined by the electoral commission.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="wardname"
                label="Council Name"
                type="text"
                fullWidth
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {this.handleClose();}} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => {this.handleAddCouncil();}} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
  }
}

