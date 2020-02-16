import React, { Component } from 'react';

//
//  Material UI Controls
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

//
//  Icons
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
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
import SocialMedia from './SocialMedia';

export default class CampaignEdit extends Component {
  constructor(props) {
      super(props);
      this.state = {

          selectedtab:0,
            
        };
      this.Reloading = false;
  }

  onTabChanged(event, value) {
    this.setState({ selectedtab: value });
  };

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
      //backgroundColor: "#A0A5AC" 
    };

    const tabpageStyle = {
      //backgroundColor: "#E0E5EC" 
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
            <SocialMedia owner={this.props.guid} onChange={() => this.campaignchanged()} />
        </div>

    </div>
    );
  }
}

