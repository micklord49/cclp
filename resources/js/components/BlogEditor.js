import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';

import AlertSave from './AlertSave';

import NoteAddIcon from '@material-ui/icons/NoteAdd';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';


import BlogPost from './BlogPost';


export default class BlogEditor extends Component {

  

  constructor(props) {
      super(props);
      this.state = {
        postguid: "", 
        edittitle: "", 
        openedit: false, 
        owner: props.owner ,

        opensuccess: false, 
        openfail: false, 
        failmessage: '',         

      };
      this._child = React.createRef();
      this.tableRef = React.createRef();
    }

  componentDidMount(){
    console.log("Editing blog for owner:"+this.props.owner)
  }


  handleSubmit(event) 
  {
    event.preventDefault();

    const user = {
      type: 'INFO',
      name: this.state.name,
      about: this.state.about,
      birthdate: this.state.birthdate,
      hidebirthdate: this.state.hidebirthdate?1:0,
      telephone: this.state.telephone,
      publicemail: this.state.publicemail
    }

    let uri = '/profile/'+this.props.guid;
    axios.patch(uri, user).then((response) => {
          //this.props.history.push('/display-item');
    });
  }

  onNew()
  {
    console.log("OnNew()");
    this.setState({ edittitle: "New Blog Post"});
    this.setState({ postguid: ""});
    this.setState({ openedit: true});
    console.log("Opened blog editor");
  }

  editPost(guid)
  {
    console.log("OnNew()");
    this.setState({ edittitle: "New Blog Post"});
    this.setState({ postguid: guid});
    this.setState({ openedit: true});
    console.log("Opened blog editor");
  }

  onSave()
  {
    console.log("OnSave()");
    this.saveAndRefresh();
  }

  async saveAndRefresh()
  {
    this.setState({ openedit: false});
    this._child.current.save()
      .then(()=>{
        this.setState({ opensuccess: true })
        this.tableRef.current.onQueryChange();
      })
      .catch((error) => {
        this.setState({ failmessage: error, openfail: true })
        console.log(error);
      });
  }

  onCancel()
  {
    console.log("OnCancel()");
    this.setState({ openedit: false});
  }

  render() 
  {

    const neu = {
      backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop:10,
      paddingBottom:16,
      paddingLeft:10,
      paddingRight: 20,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    

    return (
      <div style={neu}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <Button color="primary" onClick={()=>{this.onNew();}}>
                <NoteAddIcon />New
            </Button>
        </Grid>
        <Grid item xs={12}>
            <h5>{this.props.description}</h5>
          <MaterialTable
            tableRef={this.tableRef}
            columns={[
              {
                field: 'edit',
                Title: 'Edit',
                render: rowData => 
                          <IconButton color="primary" onClick={() => {this.editPost(rowData.guid)}}>
                            <EditIcon />
                          </IconButton>
              },
              { title: 'Title', field: 'title' },
              { title: 'Published On', field: 'publishedOn' },
            ]}
            data={query =>
              new Promise((resolve, reject) => {
                let url = '/blog/' + query.pageSize + "/" + (query.page + 1) + "/" + this.props.owner + "/ownersearch" 
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
            title="Blog Posts" 
          />
        </Grid>
      </Grid>
      <Dialog fullScreen open={this.state.openedit} onClose={()=>{this.onCancel();}} >
        <AppBar style={{position: 'relative'}}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={()=>{this.onCancel();}} aria-label="close">
              <CloseIcon />
            </IconButton>
            <div style={{flex: 1}}>
              {this.state.edittitle}
            </div>
            <Button startIcon={<CancelIcon />} autoFocus color="inherit" onClick={()=>{this.onCancel();}}>
              Cancel
            </Button>
            <Button startIcon={<SaveIcon />} autoFocus color="inherit" onClick={()=>{this.onSave();}}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <BlogPost ref={this._child} owner={this.state.owner} guid={this.state.postguid} />
      </Dialog>
      <AlertSave opensuccess={this.state.opensuccess} openfail={this.state.openfail} failmessage={this.state.failmessage} datatype="blog"/>
    </div>    );
  }
}