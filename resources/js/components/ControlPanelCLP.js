import React, { Component } from 'react';

import PropTypes from 'prop-types';


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import MembershipIcon from '@material-ui/icons/CardMembership';

import ControlPanelCLPHome from './ControlPanelCLPHome';
import ControlPanelCLPSocial from './ControlPanelCLPSocial';
import ControlPanelCLPCouncils from './ControlPanelCLPCouncils';
import ControlPanelCLPBranches from './ControlPanelCLPBranches';
import BlogEditor from './BlogEditor';
import Campaign from './Campaign';
import UploadPicture from './UploadPicture'
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
          <Tab label="News" icon={<HomeIcon />}  {...a11yProps(0)} />
          <Tab label="Basic Information" icon={<HomeIcon />}  {...a11yProps(1)} />
          <Tab label="Home Page Image" icon={<MembershipIcon />} {...a11yProps(2)} />
          <Tab label="Social Media" icon={<MembershipIcon />} {...a11yProps(3)} />
          <Tab label="Councils" icon={<AccountBalanceIcon />} {...a11yProps(4)} />
          <Tab label="Branches"  icon={<AccountTreeIcon />} {...a11yProps(5)} />
          <Tab label="My Campaigns"  icon={<AccountTreeIcon />} {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel style={tabpageStyle} value={value} index={0}>
        <BlogEditor owner={props.guid} description="Your posts as the CLP"/>
      </TabPanel>
      <TabPanel style={tabpageStyle} value={value} index={1}>
        <ControlPanelCLPHome />
      </TabPanel>
      <TabPanel style={tabpageStyle} value={value} index={2}>
        <UploadPicture title="Upload Home page picture" helptext="profile.picture" owner={props.guid} />
      </TabPanel>
      <TabPanel style={tabpageStyle} value={value} index={3}>
        <SocialMedia  owner={props.guid}/>
      </TabPanel>
      <TabPanel style={tabpageStyle} value={value} index={4}>
        <ControlPanelCLPCouncils />
      </TabPanel>
      <TabPanel style={tabpageStyle} value={value} index={5}>
        <ControlPanelCLPBranches owner={props.guid} />
      </TabPanel>
      <TabPanel style={tabpageStyle} value={value} index={6}>
        <Campaign owner={props.guid} />
      </TabPanel>
    </div>
  );
}
