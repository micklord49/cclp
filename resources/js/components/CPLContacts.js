import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { push as Menu } from 'react-burger-menu'

import ContactsIcon from '@material-ui/icons/Contacts';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import HelpIcon from '@material-ui/icons/Help';

import CPLContactList from './CPLContactList';
import CPLTagList from './CPLTagList';
import CPLContactStats from './CPLContactStats';

const styles = theme => ({
  root: {
    backgroundColor: "#E0E5EC" ,
    flexGrow: 1,
    display: 'flex',

  },

  tabpage: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,

  },

  '.MuiTabs-fixed': {
      width: 50,
  }

});


class CPLContacts extends Component {

  constructor(props) {
      super(props);
      this.state = { selectedtab: 0, selectedmaintab: 0};
  }

  componentDidMount(){
  }

  handleMainChange(event, value) {
    this.setState({ selectedmaintab: value });
  };


  render() 
  {
    const { classes } = this.props;

    const containerStyle = {
        paddingTop: 46 ,
      };

    const tabMainStyle = {
      backgroundColor: "#212121",
      color: "#ffffff" ,
      width: 50,
    };

    const tabStyle = {
        backgroundColor: "#A0A5AC" 
    };

    const tabpageStyle = {
    backgroundColor: "#E0E5EC" 
    };
    
    const styles = {
        bmMenuWrap: {
          position: 'fixed',
          height: '100%'
        },
        bmMenu: {
          background: '#212121',
          padding: '0 0 0',
          fontSize: '0.8em',
          textAlign: 'center'
        },

        bmItemList: {
          color: '#eeeeee',
          padding: '0.2em 0 0 0'
        },

      }
      
      
    return(
    <div id="outer-container" className={classes.root} style={containerStyle}>
        <Menu isOpen={ true } styles={ styles }
                outerContainerId={ "outer-container" }
                pageWrapId={ "page-wrap" }
                disableCloseOnEsc
                noTransition
                noOverlay
                disableOverlayClick
                customBurgerIcon={ false } 
                customCrossIcon={ false } 
                width={80}>
            <a onClick={()=>{this.setState({selectedmaintab:0}); }} className="menu-item">{<ContactsIcon />}<br/>Contacts</a>
            <a onClick={()=>{this.setState({selectedmaintab:1}); }} className="menu-item">{<LoyaltyIcon />}<br/>Tags</a>
            <a onClick={()=>{this.setState({selectedmaintab:2}); }} className="menu-item">{<ShowChartIcon />}<br/>Statistics</a>
            <a onClick={()=>{this.setState({selectedmaintab:3}); }} className="menu-item">{<HelpIcon />}<br/>Help</a>
        </Menu>
        <main id="page-wrap" style={{width: '100%', paddingRight: 40}}>
        
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 0}>
                <CPLContactList />
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 1}>
                <CPLTagList guid={this.props.guid}/>
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 2}>
                <CPLContactStats title="Upload Home page picture" helptext="profile.picture" owner={this.props.guid} />
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 3}>
                <h4>Help</h4>
            </div>

                
        </main>

    </div>
    );
  }
}

export default withStyles(styles)(CPLContacts);

