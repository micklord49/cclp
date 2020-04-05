import React, { Component } from 'react';

import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/CheckCircle';

import CPLContactDetails from '../CPLContactDetails';

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
  
  

export default class ListContacts extends Component {
  constructor(props) {
      super(props);
      this.state = {guid: ''};
      //this.addUser = this.addUser.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
  }

  selectContact(item)
  {
    this.setState({guid: item.guid});
  }

  render() 
  {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '', field: 'from', width:50,
                  render: rowData => 
                    <div>
                      { rowData.email_verified_at != null ? <DoneIcon style={{ color: '#00e000' }}/> : '' }
                    </div>
              },
              { title: 'Name', field: 'name' },
              { title: 'Email', field: 'email' },
              { title: 'First Contact', field: 'created_at', type: 'datetime' },
            ]}
            data={query =>
              new Promise((resolve, reject) => {
                let url = '/contacts/' +this.props.owner + '/' + query.pageSize + "/" + (query.page + 1) + "/listsearch" 
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
            title="Contacts" 
            padding="dense"
            onRowClick={(event,contact)=>{this.selectContact(contact);}}
            options={{
              exportButton: true
            }}
      
          />
        </Grid>
        <Grid item xs={12}>
            <CPLContactDetails guid={this.state.guid} />
        </Grid>
      </Grid>
    );
  }
}

