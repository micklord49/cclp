import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//
//  Material UI Controls
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import EventIcon from '@material-ui/icons/Event';
import CameraIcon from '@material-ui/icons/Camera';
import ShareIcon from '@material-ui/icons/Share';

//
//  CCLP Components
import CampaignEdit from './CampaignEdit';
import StatsCard from './StatsCard';

export default class Campaign extends Component {
  constructor(props) {
      super(props);
      this.state = {
          campaigns: new Array(), 
          selectedcampaign: '',

          selectedtab:0,
        
          open: false, 
          newname: ''
            
        };
      //this.selectRole = this.selectRole.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
  }

  campaignselected(e){
    //if(r=='') return;
    //console.log("Calling select campaign..."+r);
    console.log(e);
    for(let i=0;i<this.state.campaigns.length;i++)
    {
    //  if(this.state.campaigns[i].guid == r)  
    //  {
    //    console.log("Setting campaign..."+this.state.campaigns[i]);
        //this.setState({ selectedcampaign: this.state.campaigns[i] });
    //  }
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
        this.setState({  
          campaigns: response.data
        });
        if(response.data.length>0) this.setState({  selectedcampaign: response.data[0].guid });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  addUser(guid)
  {
    let uri = '/campaign/'+this.state.selectedcampaign+"/"+guid+'/adduser';
    axios.get(uri, {}).then((response) => {
          //this.props.history.push('/display-item');
          this.campaignchanged();
        });

  }

  removeUser(guid)
  {
    let uri = '/campaign/'+this.state.selectedcampaign+"/"+guid+'/removeuser';
    axios.get(uri, {}).then((response) => {
          //this.props.history.push('/display-item');
          this.campaignchanged();
        });
  }


  campaignchanged()
  {
    if(this.props.owner=='')   return;
    if(this.state.selectedcampaign==undefined)  return;
    console.log("ControlPanelEC - campaign changes");

    axios.get("/campaign/"+this.props.owner+"/edit")
    .then(response => {
      this.setState({
          campaigns: response.data.campaigns,
          adminusers: response.data.adminusersm
       });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() 
  {
    if(this.props.owner=='')
    {
      return(<div>Loading...</div>)
    }
    let cards = "";

    if(this.state.campaigns != null)
    {
      cards = this.state.campaigns.map((item,key) =>
          <StatsCard key={'sc'+item.guid} stats={item.stats}/>
      );
    }


    return (
        <div>
            <Grid container spacing={3}>                
                <Grid item xs={12}>
                  <Button startIcon={<AddIcon />} onClick={() => {this.handleClickOpen();}} color="primary">Add New Campaign</Button>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={4}>
                    {cards}
                  </Grid>
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
                        label="New Campaign Title"
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

