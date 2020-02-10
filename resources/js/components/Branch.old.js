import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import HomeIcon from '@material-ui/icons/Home';
import GavelIcon from '@material-ui/icons/Gavel';
import FaceIcon from '@material-ui/icons/Face';
import MembershipIcon from '@material-ui/icons/CardMembership';
import CameraIcon from '@material-ui/icons/Camera';
import PersonIcon from '@material-ui/icons/Person';

import ControlPanelCLPBranchInfo from './ControlPanelCLPBranchInfo';
import BranchInfo from './BranchInfo';
import Campaign from './Campaign';
import UploadPicture from './UploadPicture'
import BlogEditor from './BlogEditor'
import SocialMedia from './SocialMedia';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabStyle = {
    backgroundColor: "#A0A5AC" 
  };

  const tabpageStyle = {
    backgroundColor: "#E0E5EC" 
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs style={tabStyle} value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="News" icon={<FaceIcon />}  {...a11yProps(0)} />
          <Tab label="Page Picture" icon={<CameraIcon />}  {...a11yProps(0)} />
          <Tab label="Basic Information" icon={<MembershipIcon />} {...a11yProps(1)} />
          <Tab label="About" icon={<MembershipIcon />} {...a11yProps(1)} />
          <Tab label="Membership" icon={<MembershipIcon />} {...a11yProps(1)} />
          <Tab label="Social Media" icon={<MembershipIcon />} {...a11yProps(1)} />
          <Tab label="My Campaigns" icon={<MembershipIcon />} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel style={tabpageStyle} value={value} index={0}>
          <BlogEditor owner={props.guid} description="Your posts as a branch"/>
      </TabPanel>
      <TabPanel style={tabpageStyle} value={value} index={1}>
        <UploadPicture title="Upload profile picture" helptext="profile.picture" owner={props.guid} />
      </TabPanel>
      <TabPanel style={tabpageStyle} value={value} index={2}>
        <ControlPanelCLPBranchInfo guid={props.guid}/>
      </TabPanel>
      <TabPanel style={tabpageStyle} value={value} index={3}>
        <BranchInfo guid={props.guid}/>
      </TabPanel>
      <TabPanel style={tabpageStyle} value={value} index={4}>
        Membership
      </TabPanel>
      <TabPanel style={tabpageStyle} value={value} index={5}>
        <SocialMedia owner={props.guid}/>
      </TabPanel>
      <TabPanel style={tabpageStyle} value={value} index={6}>
        <Campaign owner={props.guid}/>
      </TabPanel>
    </div>
  );
}
