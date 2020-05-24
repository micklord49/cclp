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

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import NewIcon from '@material-ui/icons/Add';


import AlertSave from '../AlertSave';
import SurveyEdit from './SurveyEdit';
import QuestionEdit from './QuestionEdit';
import QuestionIcon from './QuestionIcon';

export default class SurveyEditor extends Component {

  constructor(props) {
      super(props);
      this.state = {
        items: [],

        selectedQuestion: "",
        selectedSurvey: "",
        openSurvey: "",
        
        newname: "",

        newtitle: "", 
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
    console.log("Editing blog for owner:"+this.props.owner);
    this.refresh();
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
    this.setState({ 
      surveyguid: "",
      newtitle: "Survey",
      opennew: true
    });
    console.log("Opened blog editor");
  }

  onNew()
  {
    console.log("OnNew()");
    this.setState({ 
      surveyguid: "",
      newtitle: "Survey",
      opennew: true
    });
    console.log("Opened blog editor");
  }

  editPost(guid)
  {
    this.setState({ surveyguid: guid});
  }

  onSave()
  {
    console.log("OnSave()");
    this.saveAndRefresh();
  }

  onselect(e,nodeId)
  {
    e.preventDefault();
    if(nodeId.substr(0,3)=='SRV') this.selectSurvey(nodeId);
    else this.selectQuestion(nodeId);
  }

  selectSurvey(nodeId)
  {
    this.setState({
      selectedQuestion: "",
      selectedSurvey: nodeId,
      openSurvey: nodeId
    });
  }

  selectQuestion(nodeId)
  {
    this.setState({
      selectedQuestion: nodeId,
      selectedSurvey: ""
    });
  }

  async save() 
  {
    console.log("save");
    let post = "";
    let uri = "";
    if(this.state.newtitle=="Question")
    {
      post = {
        guid: "",
        owner: this.state.openSurvey,
        name: this.state.newname,
        type: 1,
      }
      uri = '/surveyitem/';
    }
    else
    {
      post = {
        guid: "",
        owner: this.props.owner,
        name: this.state.newname,
      }
      uri = '/survey/';
    }
    await axios.patch(uri, post)
      .then((response) => {
        this.setState({ newname: "", newtype: "1"})
      })
  }

  async saveAndRefresh()
  {
    console.log("saveAndRefresh");
    this.setState({ opennew: false});
    this.save()
      .then(()=>{
        this.setState({ opensuccess: true })
        this.refresh();
      })
      .catch((error) => {
        this.setState({ failmessage: error, openfail: true })
        console.log(error);
      });
  }

  refresh()
  {
   let uri = '/survey/'+this.props.owner+'/ownerdir';
   axios.get(uri).then((response) => {
     this.setState({
       items: response.data.data, 
     });
   });
  }

  onNewQuestion()
  {
    console.log("onNewQuestion");

    this.setState({ 
      surveyguid: "",
      newtitle: "Question",
      opennew: true
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

    var editor = "Please select a survey or a question.";
    if(this.state.selectedSurvey != "") editor=<SurveyEdit owner={this.props.owner} onSaved={()=>this.refresh()} guid={this.state.selectedSurvey} />;
    if(this.state.selectedQuestion != "") editor=<QuestionEdit owner={this.props.owner} onSaved={()=>this.refresh()} guid={this.state.selectedQuestion} />;


    let treeitems = "";
    if(this.state.items != null)
    {
      console.log(this.state.items);
      treeitems = this.state.items.map((item,key) =>
            <TreeItem 
              nodeId={item.guid} 
              key={item.guid} 
              label={item.name}  
            >
              {item.items.map((quest,qkey) => 
                <TreeItem 
                    nodeId={quest.guid} 
                    key={quest.guid}
                    label={<div>
                          <QuestionIcon color="inherit" type={quest.type}/>
                            {quest.name}
                          </div>
                      }
                    >
                  </TreeItem>)}
            </TreeItem>
      );
    }
    
    const treealign = {
      justifyContent: "flex-start",
      flexDirection: "row",
      display: "inline-block"
    };

    return (
      <div style={neu}>
      <Grid container spacing={2}>
        <Grid container item direction="row" style={treealign} justify="flex-start" alignItems="flex-start" xs={4}>
          <Grid item xs={12}>
            <Button color="primary" disabled={this.state.published} startIcon={<NewIcon />} onClick={()=>{this.onNew();}}>
                New Survey
              </Button>

          </Grid>
          <Grid item xs={12}>
  
          <TreeView
            defaultCollapseIcon={<FolderIcon />}
            defaultExpandIcon={<FolderOpenIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
            onNodeSelect={(e,v)=>this.onselect(e,v)}
            expanded={[this.state.openSurvey]}

          >
            {treeitems}
          </TreeView>

          </Grid>
        </Grid>
        <Grid container item xs={8}>
          <Grid item xs={12}>
            <Button color="primary" disabled={this.state.published} startIcon={<NewIcon />} onClick={()=>{this.onNewQuestion();}}>
                New Question
            </Button>
          </Grid>
          <Grid item xs={12}>
            {editor}
          </Grid>
        </Grid>
      </Grid>




      <Dialog open={this.state.opennew} style={{zIndex:'4100'}} onClose={()=>{this.onCancel();}} >
        <DialogTitle>New {this.state.newtitle}</DialogTitle>
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