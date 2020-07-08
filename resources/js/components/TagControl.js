import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TagList from './TagList';
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';

export default class TagControl extends Component {
  constructor(props) {
      super(props);
      this.state = {
          selectedtag: '',
          alltags: Array(),
          };
  }

  componentDidMount(){
    this.refresh();
  }

  refresh()
  {
    axios.get("/clpapi/tags") 
    .then(response => {
      this.setState({  alltags: response.data });
    })
    .catch(function (error) {
      console.log(error);
    })

  }



  addTag()
  {
    this.props.addTag(this.state.selectedtag);
    this.setState({selectedtag: ''})
  }


  onRemoveTag(guid)
  {
    this.props.onremovetag(guid);
  }

  handleChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  render() 
  {    

    if(this.props.owner=='')
    {
      return(<div>Loading...</div>)
    }
    let listitems = "";

    if(this.state.alltags != null)
    {
      listitems = this.state.alltags.map((item,key) =>
          <MenuItem key={item.guid} value={item.guid}>{item.name}</MenuItem>
      );
    }


    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FormControl >
                            <InputLabel id="select-tag-label">Tag</InputLabel>
                            <Select
                                labelId="select-tag-label"
                                id="select-tag"
                                value={this.state.selectedtag}
                                name="selectedtag"
                                onChange={(e)=>{this.handleChange(e);}}
                                autoWidth={true}
                                startAdornment={
                                  <InputAdornment position="start">
                                    <Button startIcon={<AddIcon />} 
                                            autoFocus color="inherit" 
                                            onClick={()=>{this.addTag();}}>
                                        Add Tag
                                    </Button>
                                  </InputAdornment>
                                }
            
                            >
                            {listitems}
                            </Select>
                        </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TagList tags={this.props.tags} onremovetag={(guid) => {this.onRemoveTag(guid);}} />
            </Grid>
        </Grid>
    );
  }
}


