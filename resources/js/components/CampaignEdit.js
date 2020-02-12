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
import CampaignInfo from './CampaignInfo';
import BlogEditor from './BlogEditor';
import Event from './Event';
import UploadPicture from './UploadPicture'
import ControlPanelUserGroup from './ControlPanelUserGroup';
import SocialMedia from './SocialMedia';

export default class CampaignEdit extends Component {
  constructor(props) {
      super(props);
      this.state = {

          selectedtab:0,
            
        };
      //this.selectRole = this.selectRole.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
      this.Reloading = false;
  }

  

  handleChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    if(name=='selectedcampaign')    this.campaignchanged();
  }

  componentDidMount(){
      this.refresh();
  }

  refresh()
  {
    this.campaignchanged();
  }

  addUser(guid)
  {
    let uri = '/campaign/'+this.props.guid+"/"+guid+'/adduser';
    axios.get(uri, {}).then((response) => {
          //this.props.history.push('/display-item');
          this.campaignchanged();
        });

  }

  removeUser(guid)
  {
    let uri = '/campaign/'+this.props.guid+"/"+guid+'/removeuser';
    axios.get(uri, {}).then((response) => {
          //this.props.history.push('/display-item');
          this.campaignchanged();
        });
  }

  onTabChanged(event, value) {
    this.setState({ selectedtab: value });
  };

  componentWillUpdate()
  {
    if(this.Reloading)  this.Reloading = false;
    else                this.campaignchanged();
  }


  campaignchanged()
  {
    if(this.props.guid=='')   return;
    if(typeof(this.props.guid) == 'undefined')  return;

    this.Reloading = true;

    axios.get("/campaign/"+this.props.guid+"/edit")
    .then(response => {
      console.log("Campaign Edit campaignchanged()");
      console.log(response);
      this.setState({  
        adminusers: response.data.adminusers
      });
      if(response.data.campaigns.length > 0)  this.selectCampaign(this.state.selectedcampaign.guid);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() 
  {
      if(typeof(this.props.guid)=='undefined')
      {
          return(<div></div>);
      }
      if(this.props.guid=='')
      {
          return(<div>Loading...</div>);
      }
    const tabStyle = {
      backgroundColor: "#A0A5AC" 
    };

    const tabpageStyle = {
    backgroundColor: "#E0E5EC" 
    };

    
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
        <Tabs 
                style={tabStyle} 
                value={this.state.selectedtab} 
                aria-label="simple tabs example" 
                name="selectedtab"
                onChange={(e,v) => { this.onTabChanged(e,v); }}>
            <Tab label="News"  icon={<AnnouncementIcon />} />
            <Tab label="Events"  icon={<EventIcon />} />
            <Tab label="About" icon={<RecordVoiceOverIcon />} />
            <Tab label="Images" icon={<CameraIcon />} />
            <Tab label="Admin Users" icon={<SupervisorAccountIcon />} />
            <Tab label="Social" icon={<ShareIcon />} />
        </Tabs>
        <div role="tabpanel" hidden={this.state.selectedtab != 0}>
            <BlogEditor owner={this.props.guid} description="Your posts as the CLP"/>
        </div>
        <div role="tabpanel" hidden={this.state.selectedtab != 1}>
            <Event owner={this.props.guid} />
        </div>
        <div role="tabpanel" hidden={this.state.selectedtab != 2}>
            <CampaignInfo guid={this.props.guid} onChange={() => this.campaignchanged()} />
        </div>
        <div role="tabpanel" hidden={this.state.selectedtab != 3}>
            <UploadPicture title="Campaign Image" owner={this.props.guid} onChange={() => this.campaignchanged()} />
        </div>
        <div role="tabpanel" hidden={this.state.selectedtab != 4}>
            <ControlPanelUserGroup onremoveuser={(guid)=>{this.removeUser(guid)}} users={this.state.adminusers} addUser={(guid) => this.addUser(guid)}/>
        </div>
        <div role="tabpanel" hidden={this.state.selectedtab != 5}>
            <SocialMedia owner={this.props.guid} onChange={() => this.campaignchanged()} />
        </div>

    </div>
    );
  }
}

