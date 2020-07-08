 
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//
//  Material UI Controls
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

//
//  Icons
import AddIcon from '@material-ui/icons/Add';


//
// Components
import QuestionIcon from './QuestionIcon';
import QuestionEdit from './QuestionEdit';


export default class SurveyItems extends Component {
  constructor(props) {
      super(props);
      this.state = {
          items: new Array(), 
          selectedsurvey: { guid: ''},

          newname: "",
          newtype: 1,
          opennew: false,
        };
  }

  handleChange(e){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    this.setState({
      [name]: value
    });
  }


  selectSurvey(r){
    for(let i=0;i<this.state.items.length;i++)
    {
      if(this.state.items[i].guid == r)  
      {
        this.setState({ selectedsurvey: this.state.items[i] });
      }
    }
  }

  componentDidMount(){
    axios.get("/survey/"+this.props.owner+"/items")
    .then(response => {
      this.setState({  items: response.data.items });
      this.setState({  selectedsurvey: response.data.items[0] });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  componentDidUpdate(prevProps) 
  {
    if(typeof(this.props.owner) == "undefined")   return;
    if(prevProps.owner == this.props.owner)     return;

    axios.get("/survey/"+this.props.owner+"/items")
    .then(response => {
      this.setState({  items: response.data.items });
      this.setState({  selectedsurvey: response.data.items[0] });
    })
    .catch(function (error) {
      console.log(error);
    })
  
  }


  surveychanged()
  {
    axios.get("/survey/"+this.props.owner+"/items")
    .then(response => {
      this.setState({  items: response.data.items });
      this.selectSurvey(this.state.selectedsurvey.guid);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  onAddNew()
  {
    this.setState({ opennew: false});
    this.save()
      .then(()=>{
        this.setState({ opensuccess: true });
        this.surveychanged();
      })
      .catch((error) => {
        this.setState({ failmessage: error, openfail: true })
        console.log(error);
      });
  }

  async save() 
  {
    const post = {
      guid: "",
      owner: this.props.owner,
      name: this.state.newname,
      type: this.state.newtype,
    }

    let uri = '/surveyitem/';
    await axios.patch(uri, post)
      .then((response) => {
        this.setState({ newname: "", newtype: "1"})
      })
    console.log("Saving new post");
  }


  onCancel()
  {
    this.setState({ opennew: false});
  }

  onAddNewQuestion()
  {
    this.setState({ opennew: true});
  }

  render() 
  {
    if(this.props.owner=='') return;

    let listitems = "";
    if(this.state.items != null)
    {
      listitems = this.state.items.map((item,key) =>
            <ListItem key={item.guid} button onClick={() => this.selectSurvey(item.guid)}>
              <ListItemIcon>
                <QuestionIcon type={item.type} />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
      );
    }
    
    const neu = {
      backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop:10,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    const listalign = {
      justifyContent: "flex-start",
      flexDirection: "row",
      display: "inline-block"
    };

    const listbutton = {
      height:30
    };

    var editor="";
    if(this.state.selectedsurvey)
    {
      editor=<QuestionEdit guid={this.state.selectedsurvey.guid} />
    }

    return (
      <Grid container spacing={3}>
        <Grid container item xs={3} direction="row" justify="flex-start" style={listalign} alignItems="flex-start">
            <Grid item xs={12}>
                <Button startIcon={<AddIcon />} autoFocus color="inherit" onClick={()=>{this.onAddNewQuestion();}}>
                    Add Question
                </Button>
            </Grid>
            <Grid item xs={12}>
                <List component="nav" style={neu}>
                    {listitems}
                </List>
            </Grid>
        </Grid>
        <Grid item xs={9}>          
          {editor}
        </Grid>
        <Dialog 
            style={{zIndex:'4100'}} 
            open={this.state.opennew} 
            maxWidth="xs"
            fullWidth={true}
            onClose={()=>{this.onCancelNew();}} 
        >
            <DialogTitle>New Question</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} style={{padding:20}}>
                <Grid item xs={12}>
                    <TextField 
                        value={this.state.newname} 
                        label="Question" 
                        name="newname"
                        fullWidth
                        onChange={(e)=>{this.handleChange(e);}} 
                        helperText="(Ask the question - keep it consise)"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Question Type</FormLabel>
                        <RadioGroup aria-label="Question Type" name="newtype" value={this.state.newtype} onChange={(e)=>{this.handleChange(e);}} >
                            <FormControlLabel value="1" control={<Radio />} label="Vote" />
                            <FormControlLabel value="2" control={<Radio />} label="Text" />
                            <FormControlLabel value="3" control={<Radio />} label="Contact" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{this.onCancel();}} color="primary">
                Cancel
            </Button>
            <Button onClick={()=>{this.onAddNew();}} color="primary">
                Create
            </Button>
            </DialogActions>
        </Dialog>
      </Grid>

    );
  }
}

