import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import PropTypes from 'prop-types';

import { createMuiTheme } from '@material-ui/core/styles';
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
import CameraIcon from '@material-ui/icons/CameraAlt';


import BlogPost from './BlogPost';
import UploadPicture from './UploadPicture';
import zIndex from '@material-ui/core/styles/zIndex';


export default class BlogEditor extends Component {

  

  constructor(props) {
      super(props);
      this.state = {
        postguid: "", 
        edittitle: "", 
        owner: props.owner ,

        openedit: false, 
        openpicture: false,

        opensuccess: false, 
        openfail: false, 
        failmessage: '',         

      };
      this._childBlog = React.createRef();
      this._childPicture = React.createRef();
      this.tableRef = React.createRef();

      this.theme = createMuiTheme({
        palette: {
          primary: {
            main: '#4caf50',
          },
          secondary: {
            main: '#ff9100',
          },
        },
  
      });
  
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
    this.setState({ edittitle: "New Blog Post"});
    this.setState({ postguid: guid});
    this.setState({ openedit: true});
  }

  editImage(guid)
  {
    this.setState({ edittitle: "Post Image"});
    this.setState({ postguid: guid});
    this.setState({ openpicture: true});
  }

  onSave()
  {
    console.log("OnSave()");
    this.saveAndRefresh();
  }

  async saveAndRefresh()
  {
    console.log("saveAndRefresh()");
    this.setState({ openedit: false});
    this._childBlog.current.save()
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

  onCancelPicture()
  {
    console.log("OnCancel()");
    this.setState({ openpicture: false});
  }

  render() 
  {

    const neu = {
      //backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: "auto",
      marginRight: 60,
      marginTop:10,
      paddingBottom:16,
      paddingLeft:10,
      paddingRight: 20,
      //boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    
    const form = {
      backgroundColor: "#ffffff" ,
      borderTop: "thin ridge silver",
      borderRadius: 20,
    };


    return (
      <div style={neu}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MaterialTable
            tableRef={this.tableRef}
            columns={[
              {
                field: 'edit',
                Title: 'Edit',
                sorting: false, 
                cellStyle: {padding:0} ,
                render: rowData => 
                          <IconButton color="primary" onClick={() => {this.editPost(rowData.guid)}}>
                            <EditIcon />
                          </IconButton>
              },
              {
                field: 'edit',
                Title: 'Edit',
                sorting: false, 
                cellStyle: {padding:0}, 
                render: rowData => 
                          <IconButton color="primary" onClick={() => {this.editImage(rowData.guid)}}>
                            <CameraIcon />
                          </IconButton>
              },
              { title: 'Title', field: 'title', cellStyle:{padding:0}  },
              { title: 'Published On', field: 'publishedOn', type:"datetime", cellStyle:{padding:0} },
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

                  actions={[
                    {
                      icon: 'add',
                      tooltip: 'Add New Post',
                      isFreeAction: true,
                      onClick: () => this.onNew()
                    }
                  ]}
            
            padding="dense"
            title={this.props.description} 
          />
        </Grid>
      </Grid>
      <Dialog fullScreen open={this.state.openedit} style={{zIndex:'4100'}} onClose={()=>{this.onCancel();}} >
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
        <BlogPost ref={this._childBlog} owner={this.state.owner} guid={this.state.postguid} />
      </Dialog>
      <Dialog fullScreen  style={{zIndex:'4100'}} open={this.state.openpicture} onClose={()=>{this.onCancelPicture();}} >
        <AppBar style={{position: 'relative'}}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={()=>{this.onCancelPicture();}} aria-label="close">
              <CloseIcon />
            </IconButton>
            <div style={{flex: 1}}>
              {this.state.edittitle}
            </div>
            <Button startIcon={<CancelIcon />} autoFocus color="inherit" onClick={()=>{this.onCancelPicture();}}>
              Done
            </Button>
          </Toolbar>
        </AppBar>
        <UploadPicture ref={this._childPicture} title="Upload blog picture" helptext="profile.picture" owner={this.state.postguid} />
      </Dialog>
      <AlertSave opensuccess={this.state.opensuccess} openfail={this.state.openfail} failmessage={this.state.failmessage} datatype="blog"/>
    </div>    );
  }
}