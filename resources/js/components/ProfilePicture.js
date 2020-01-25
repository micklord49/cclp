import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import UploadPicture from './UploadPicture'

export default class ProfilePicture extends Component {
  render() {
      return (
        <UploadPicture title="Upload profile picture" helptext="profile.picture" owner={this.props.guid} />
      );
  }
}

