import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';

import MaterialTable from 'material-table';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarBorder';
import AddIcon from '@material-ui/icons/Add';

import UserCard from './UserCard';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }));
  
  

export default class CPLTagList extends Component {
  constructor(props) {
      super(props);
      this.state = {role: new Object()};
      //this.addUser = this.addUser.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
  }

  render() 
  {
    return (
        <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={[
            { title: 'From', field: 'from' },
            { title: 'Subject', field: 'subject' },
            { title: 'Recieved At', field: 'created_at' },
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              let url = '/message/' + this.props.owner + "/" + query.pageSize + "/" + (query.page + 1) + "/search" 
              fetch(url)
                .then(response => response.json())
                .then(result => {
                  resolve({
                    data: result.data,
                    page: result.page - 1,
                    totalCount: result.count,
                  })
                })
              })
   
            }
          title={this.props.title} 
          padding="dense"
          onRowClick={this.props.onSelect}
        />
      </div>
    );
  }
}

