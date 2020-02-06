import React, { Component } from 'react';

import PropTypes from 'prop-types';


import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import MembershipIcon from '@material-ui/icons/CardMembership';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import ControlPanelCLPHome from './ControlPanelCLPHome';
import ControlPanelCLPSocial from './ControlPanelCLPSocial';
import ControlPanelCLPCouncils from './ControlPanelCLPCouncils';
import ControlPanelCLPBranches from './ControlPanelCLPBranches';
import BlogEditor from './BlogEditor';
import Campaign from './Campaign';
import UploadPicture from './UploadPicture'
import SocialMedia from './SocialMedia';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));



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





export default function SimpleTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


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
