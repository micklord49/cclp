import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from './Alert';

export default class ProfileInfo extends Component {
  constructor(props) {
      super(props);
      this.state = {
        opensuccess: this.props.opensuccess, 
        openfail: this.props.openfail,
        failmessage: this.props.failmessage
    };
  }

  componentDidMount(){
  }

  handleCloseSuccess(event, reason) 
  {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ opensuccess: false });
  }

  handleCloseFail(event, reason) 
  {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openfail: false });
  }


  render() 
  {
    return (
        <div>
            <Snackbar open={this.state.opensuccess} autoHideDuration={6000} onClose={()=>{this.handleCloseSuccess();}}>
                <Alert onClose={()=>{this.handleCloseSuccess();}} severity="success">
                Your information has been saved.
                </Alert>
            </Snackbar>
            <Snackbar open={this.state.openfail} autoHideDuration={6000} onClose={()=>{this.handleCloseFail()}}>
                <Alert onClose={()=>{this.handleCloseFail();}} severity="error">
                {this.state.failmessage}
                </Alert>
            </Snackbar>
        </div>
    );
  }
}





