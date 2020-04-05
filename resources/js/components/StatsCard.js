import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//
//  Material UI Controls
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

//
//  Icons
import { IoLogoFacebook } from 'react-icons/io';
import { IoLogoInstagram } from 'react-icons/io';
import { IoLogoTwitter } from 'react-icons/io';
import { IoLogoYoutube } from 'react-icons/io';
import { IoLogoTumblr } from 'react-icons/io';

//
//  CCLP Components

export default class StatsCard extends Component {
  constructor(props) {
      super(props);
      this.state = { 
      };
  }

  componentDidMount(){
  }

  onEdit()
  {
    window.location=this.props.stats.link;
  }


  render() 
  {
    var visits = "";
    if(this.props.stats.visits.lastweek > 0){
        visits = this.props.stats.visits.lastweek + " last week"
    }
    else{
        visits = "No visits last week.";
    }

    var messages = "";
    if(this.props.stats.unread > 0)
    {
        messages =<p className="card-description"><i className="material-icons md-18">mail</i>{this.props.stats.unread} unread messages</p>
    }

    var blog = "";
    if(this.props.stats.blog.total > 0) {
        blog=<p className="card-description"><i className="material-icons md-18">chat</i> News posts {this.props.stats.blog.last7} last week, {this.props.stats.blog.last28} last month </p>
    }
    else {
        blog=<p className="card-description"><i className="material-icons md-18">chat</i> No news posted yet.</p>
    }



    return (
        <Grid item xs={4}>
            <Card>
                <CardHeader
                    action={
                        <IconButton 
                            aria-label="settings"
                            onClick={()=>{this.onEdit();}}>
                            <EditIcon />
                        </IconButton>
                    }
                    title={this.props.stats.description}
                />


            
        
            <CardContent>
                <p className="card-description">
                    <i className="material-icons md-18">link</i> {visits}
                </p>
                {messages}
                {blog}
            </CardContent>
            </Card>
        </Grid>
    );
}
}

