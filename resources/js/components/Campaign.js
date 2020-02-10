import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//
//  Material UI Controls
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//
//  Icons
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';

//
//  CCLP Components
import CampaignInfo from './CampaignInfo';

export default class Campaign extends Component {
  constructor(props) {
      super(props);
      this.state = {
          campaigns: new Array(), 
          selectedcampaign: { guid:'' },
        
          open: false, 
          newname: ''
            
        };
      //this.selectRole = this.selectRole.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
  }

  selectCampaign(r){
    if(r=='') return;
    console.log("Calling select campaign..."+r);
    console.log(this.state.campaigns);
    for(let i=0;i<this.state.campaigns.length;i++)
    {
      if(this.state.campaigns[i].guid == r)  
      {
        console.log("Setting campaign..."+this.state.campaigns[i]);
        this.setState({ selectedcampaign: this.state.campaigns[i] });
      }
    }
  }

  handleClickOpen()
  {
    this.setState({open: true});
  };

  handleClose()
  {
    this.setState({open: false});
  };

  handleAddCampaign()
  {
    this.setState({open: false});
    this.addnewcampaign();
  };

  handleChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(event);
  
    this.setState({
      [name]: value
    });
    console.log(this.state);

  }

  addnewcampaign() 
  {
    const campaign = {
      title: this.state.newtitle,
      owner: this.props.owner,
    }

    let uri = '/campaign';
    axios.post(uri, campaign).then((response) => {
          //this.props.history.push('/display-item');
          this.refresh();
    });
  }

  componentDidMount(){
      this.refresh();
  }

  refresh()
  {
    console.log("Reloading campaign...")
    axios.get("/campaign/" + this.props.owner + "/dir")
    .then(response => {
        console.log(response);
        this.setState({  campaigns: response.data });
        if(response.data.length>0) this.setState({  selectedcampaign: response.data[0] });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  campaignchanged()
  {
    if(this.props.owner=='')   return;
    if(this.state.selectedcampaign==undefined)  return;
    console.log("ControlPanelEC - campaign changes");
    axios.get("/campaign/"+this.props.owner+"/edit")
    .then(response => {
      this.setState({  campaigns: response.data.campaigns });
      if(response.data.campaigns.length > 0)  this.selectCampaign(this.state.selectedcampaign.guid);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() 
  {
    let listitems = "";
    if(this.state.campaigns != null)
    {
      listitems = this.state.campaigns.map((item,key) =>
            <ListItem key={item.guid} button onClick={() => this.selectCampaign(item.guid)}>
              <ListItemText primary={item.title} />
            </ListItem>
      );
    }
    
    const neu = {
      backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop:10,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    return (
        <div>
            <Button startIcon={<AddIcon />} onClick={() => {this.handleClickOpen();}} color="primary">Add New Campaign</Button>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <List component="nav" style={neu} aria-label="EC">
                    {listitems}
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <CampaignInfo guid={this.state.selectedcampaign.guid} onChange={() => this.campaignchanged()} />
                </Grid>
            </Grid>

            <Dialog open={this.state.open} onClose={()=>{this.handleClose();}} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new Campaign</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add a new campaign.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="campaigntitle"
                        label="Campaign Title"
                        type="text"
                        fullWidth
                        name="newtitle"
                        onChange={(e) => {this.handleChange(e);}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {this.handleClose();}} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {this.handleAddCampaign();}} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
  }
}

