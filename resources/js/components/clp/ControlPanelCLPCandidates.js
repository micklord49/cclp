import React, { Component } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

import CPLUsers from '../CPLUsers';
import HelpText from '../HelpText';

export default class ControlPanelCLPCandidates extends Component {
  constructor(props) {
      super(props);
      this.state = {};
  }


  componentDidMount()
  {
      this.refresh();
  }

  refresh()
  {
    axios.get("/candidate/dir/all")
          .then(response => {
            const items = response.data;
            this.setState({ candidates: items,
                            selectedcandidate: items[0] 
                          });
          })
          .catch(function (error) {
            console.log(error);
          })
  }

  
  addUser(guid)
  {
    let uri = '/candidate/'+guid+'/adduser';
    axios.get(uri, {}).then((response) => {
          //this.props.history.push('/display-item');
          this.refresh();
        });

  }

  removeUser(guid)
  {
    let uri = '/candidate/'+guid+'/removeuser';
    axios.get(uri, {}).then((response) => {
          //this.props.history.push('/display-item');
          this.refresh();
        });
  }

  
  render() 
  {
    const neu = {
      backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop:10,
      paddingLeft: 10,
      paddingTop: 10,
      paddingBottom: 10,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    if(typeof(this.state.candidates)=="undefined")
    {
      return(<div></div>);
    }


    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <p style={neu}>Select the user who is your local MP, or users standing as Prospective MPs</p>
          </Grid>
          <Grid item xs={12}>
            <CPLUsers onremoveuser={(guid)=>{this.removeUser(guid)}} users={this.state.candidates} addUser={(guid) => this.addUser(guid)}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

