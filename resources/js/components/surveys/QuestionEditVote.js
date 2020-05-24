import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import DateFnsUtils from '@date-io/date-fns';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import VoteIcon from './VoteIcon';

export default class QuestionEditVote extends Component {
  constructor(props) {
      super(props);
      this.state = {
        items: [],
        selecteditem: -1,

        adddisabled: false,

        newicon: 0,
        newname: '',
      };
      //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const target = event.target;   
    if(!target) 
    {
        console.log("Error - unknown target");
        console.log(event);
        return;
    }
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    this.setState({
      [name]: value,
    });


    if(name=='newicon')
    {
        if(this.state.selecteditem >= 0)    
        {
            this.state.items[this.state.selecteditem].type = value;
            this.FireOnChange();
        }
    }
    if(name=='newname')
    {
        if(this.state.selecteditem >= 0)
        {
            this.state.items[this.state.selecteditem].name = value;
            this.FireOnChange();
        }    
    }

  }
  componentDidMount()
  {
      this.refresh();
  }

  componentDidUpdate(prevProps) 
  {
    if (this.props.options !== prevProps.options) 
    {
        this.refresh();
    }
  }


  FireOnChange()
  {
    var o = this.state.items.map(i=>i.type.toString() + i.name).join(";");
    this.props.onChange(o);
  }


   refresh()
   {
       console.log("Updating VOTE with " + this.props.options);
       if(this.props.options=='')
       {
            this.setState({ items: [] });
            return;
       }
        var opts = this.props.options.split(";");
        var i = opts.map((item,index) => {
            return {
                name: item.substring(1),
                type: item.substring(0,1),                
                guid: index
            }
        });
        this.setState({ items: i });       
   }

   addnewitem()
   {
        let newitem = {
            name: this.state.newname,
            type: this.state.newicon,                
            guid: this.state.items.length
        }
        
        let i = this.state.items;
        i.push(newitem);
        this.setState({
            newicon: 0,
            newname: '',
            items: i
        });
        this.FireOnChange();
   }

   deleteitem(index)
   {
       var i = this.state.items;

       if(index==0)
       {
            i.shift();
       }
       else if(index==i.length-1)
       {
           i.pop();
       }
       else
       {
           i.splice(index,1);
       }
       for(var x=0;x<i.length;x++)
       {
           i[x].guid = x;
       }
       this.setState({ 
           selecteditem: -1,
           newname: '',
           newicon: 0,
        });
        this.FireOnChange();
    }

   selectitem(index)
   {
       if(index==this.state.selecteditem)
       {
            this.setState({
                selecteditem: -1,
                newname: '',
                newicon: 0,
                adddisabled: false,
            });
       }   
       else
       {
        this.setState({
            selecteditem: index,
            newname: this.state.items[index].name,
            newicon: this.state.items[index].type,
            adddisabled: true,
        });
       }
    }

  render() 
  {

    let listitems = "";
    if(this.state.items != null)
    {
      listitems = this.state.items.map((item,key) =>
            <ListItem 
                key={item.guid} 
                button onClick={() => this.selectitem(item.guid)}
                selected={item.guid==this.state.selecteditem}
            >
                <ListItemIcon>
                    <VoteIcon type={item.type} />
                </ListItemIcon>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={()=>{this.deleteitem(item.guid)}}>
                    <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
        </ListItem>
      );
    }

    var iconlist = [];
    for(var i = 1;i<10;i++)
    {
        iconlist.push(<MenuItem key={"icon"+i} value={i}><VoteIcon type={i} /></MenuItem>);
    }

    return (
    <Grid container spacing={4}>
        <Grid container item xs={12} spacing={4}>
            <Grid item container direction="row"xs={12} spacing={2}>
                <Grid item>
                    <FormControl >
                        <InputLabel id="iconselect-label">Icon</InputLabel>
                        <Select
                            labelId="iconselect-label"
                            value={this.state.newicon}
                            name="newicon"
                            onChange={(e)=> { this.handleChange(e); }}
                            >
                            {iconlist}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <TextField 
                        value={this.state.newname} 
                        label="New Option" 
                        name="newname"
                        fullWidth
                        onChange={(e)=>{this.handleChange(e);}} 
                    />
                </Grid>
                <Grid item>
                    <Button color="primary" disabled={this.state.adddisabled} startIcon={<AddIcon />} onClick={()=>{this.addnewitem();}}>
                        Add
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <List>
                    {listitems}
                </List>
            </Grid>
        </Grid>
   </Grid>
  );
  }
}