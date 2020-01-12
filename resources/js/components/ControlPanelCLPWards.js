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
import NavList from './NavList';
import ControlPannelCLPWard from './ControlPanelCLPWard';


export default class ControlPanelCLPWards extends Component {
  constructor(props) {
      super(props);
      this.state = {wards: new Array(), selectedward: '', open:false};
  }

  componentDidMount()
  {
    //this.refresh();
  }

  refresh()
  {
    axios.get("/councils/+" + this.props.council + "/wards")
          .then(response => {
            const items = response.data;
            this.setState({ wards: items,
                            selectedward: items[0] 
                          });
          })
          .catch(function (error) {
            console.log(error);
          })
  }

  wardselected(guid)
  {
    if(typeof(guid)=="undefined")
    {
      console.log("Ward not defined yet");
      return;
    }
    if(typeof(this.state.selectedward)=="undefined")
    {
      console.log("My ward not set");
      return;
    }
    if(this.state.selectedward.guid==guid) 
    {
      console.log("Ward already selected.");
      return;
    }
    this.props.wards.forEach(element => {
      if(element.guid==guid)
      {
        this.setState({ selectedward: element });
      }
    });
  }

  wardupdated(guid)
  {
  }

  handleClickOpen()
  {
    this.setState({open: true});
  };

  handleClose()
  {
    this.setState({open: false});
  };

  handleAddWard()
  {
    this.setState({open: false});
  };


  render() 
  {
    
    const neu = {
      backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: 10,
      marginRight: 10,
      marginTop:10,
      paddingLeft: 10,
      paddingBottom: 10,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    const formtitle = {
      color: "#90959C" ,
    };

    if(typeof(this.state.selectedward) == "undefined") 
    {
      return(<div></div>);
    }

    const open = this.state.open;


    return (
        <div style={neu}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                  <h3 style={formtitle}>Wards</h3>
                </Grid>
                <Grid item xs={3}>
                    <Button startIcon={<AddIcon />} onClick={() => {this.handleClickOpen();}} color="primary">New Ward</Button>
                    <NavList items={this.state.wards} onSelect={(guid) => this.wardselected(guid)} />
                </Grid>
                <Grid item xs={9}>
                    <ControlPannelCLPWard council={this.props.council} ward={this.state.selectedward.guid} onChange={() => this.wardupdated()} />
                </Grid>
            </Grid>
            <Dialog open={open} onClose={()=>{this.handleClose();}} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new Ward</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Add a new ward to this council. This shold be the ward as defined by the electoral commission.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="wardname"
                    label="Ward Name"
                    type="text"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {this.handleClose();}} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {this.handleAddWard();}} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
  }
}

