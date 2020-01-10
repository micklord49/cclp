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
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import MembershipIcon from '@material-ui/icons/CardMembership';

import ControlPanelCLPHome from './ControlPanelCLPHome';
import ControlPanelCLPSocial from './ControlPanelCLPSocial';
import ControlPanelCLPEC from './ControlPanelCLPEC';

import HelpText from './HelpText';


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

export default function SimpleTabs() {
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
          <Tab label="Executive Comittee" icon={<GavelIcon />} {...a11yProps(1)} />
          <Tab label="Counselors"  icon={<PeopleIcon />} {...a11yProps(2)} />
          <Tab label="Candidate"  icon={<PersonIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel style={tabpageStyle} value={value} index={0}>
        <ControlPanelCLPEC />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Councilor Details
      </TabPanel>
      <TabPanel value={value} index={2}>
        Candidate Details
      </TabPanel>
    </div>
  );
}
