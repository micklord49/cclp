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
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import SurveyStatus from './SurveyStatus';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';



import AlertSave from '../AlertSave';
import SurveyInfo from './SurveyInfo';

export default class SurveyEditor extends Component {

  constructor(props) {
      super(props);
      this.state = {
        postguid: "", 
        edittitle: "", 
        owner: props.owner ,

        newname: "",

        opennew: false, 
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


  handleChange(e){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    this.setState({
      [name]: value
    });
  }

  onNew()
  {
    console.log("OnNew()");
    this.setState({ surveyguid: ""});
    this.setState({ opennew: true});
    console.log("Opened blog editor");
  }

  editPost(guid)
  {
    this.setState({ surveyguid: guid});
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


  async save() 
  {
    const post = {
      guid: "",
      owner: this.props.owner,
      name: this.state.newname,
    }

    let uri = '/survey/';
    await axios.patch(uri, post)
      .then((response) => {
        this.setState({ newname: "" })
      })
    console.log("Saving new post");
  }

  async saveAndRefresh()
  {
    this.setState({ opennew: false});
    this.save()
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
    this.setState({ opennew: false});
  }

  render() 
  {

    const neu = {
      marginLeft: "auto",
      marginRight: 60,
      marginTop:10,
      paddingBottom:16,
      paddingLeft:10,
      paddingRight: 20,
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    

    return (
      <div style={neu}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MaterialTable
            tableRef={this.tableRef}
            columns={[
              { title: '', 
                width:50,
                cellStyle:{width:50},
                field: 'active', render: rowData => <SurveyStatus active={rowData.active} /> 
              },
              { title: 'Name', field: 'name', cellStyle:{padding:0}  },
              { title: 'Responses', field: 'responses', width:180, cellStyle:{padding:0} },
            ]}
            data={query =>
                    new Promise((resolve, reject) => {
                      let url = '/survey/' + query.pageSize + "/" + (query.page + 1) + "/" + this.props.owner + "/ownersearch" 
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
                      tooltip: 'Add New Survey',
                      isFreeAction: true,
                      onClick: () => this.onNew()
                    }
                  ]}
            
            padding="dense"
            title={this.props.description} 
            onRowClick={(e,guid) => {
              console.log("Setting surveyguid to "+guid.guid)
              this.setState({surveyguid: guid.guid});
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <SurveyInfo ref={this._childBlog} owner={this.state.owner} guid={this.state.surveyguid} />
        </Grid>
      </Grid>




      <Dialog open={this.state.opennew} style={{zIndex:'4100'}} onClose={()=>{this.onCancel();}} >
        <DialogTitle>New Survey</DialogTitle>
        <DialogContent>
        <Grid container spacing={2} style={{padding:20}}>
          <Grid item xs={12}>
              <TextField 
                  value={this.state.newname} 
                  label="Name" 
                  name="newname"
                  fullWidth
                  onChange={(e)=>{this.handleChange(e);}} 
                  helperText="(Give a meaningful name for your survey)"
              />
          </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{this.onCancel();}} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{this.onSave();}} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>




      <AlertSave style="z-index:5000" opensuccess={this.state.opensuccess} openfail={this.state.openfail} failmessage={this.state.failmessage} datatype="blog"/>
    </div>    );
  }
}