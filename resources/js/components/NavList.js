import React, { Component } from 'react';

//
//  Material UI Controls
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

//
//  Icons
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarBorder';

export default class NavList extends Component {
  constructor(props) {
      super(props);
      this.state = {items: this.props.items, selecteditem: ''};
      if(this.props.items.length > 0)
      {
        this.state = {items: this.props.items, selecteditem: this.props.items[0]};
      }
      else
      {
         this.state = {items: this.props.items, selecteditem: ''};
      }
  }

  selectItem(r)
  {
    if(typeof(this.props.items)=="undefined")
    {
      return;
    }
    this.props.items.forEach(element => {
      if(element.guid == r)  
      {
        this.setState({ selecteditem: element });
        this.props.onSelect(r);
      }
    });
  }

  componentDidMount()
  {
  }

  render() 
  {
    let listitems = "";
    const neu = {
        backgroundColor: "#E0E5EC" ,
        borderRadius:4,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop:10,
        boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
      };  
  
    if(this.props.items != null)
    {
      listitems = this.props.items.map((item,key) =>
            <ListItem key={item.guid} button onClick={() => this.selectItem(item.guid)}>
              <ListItemText primary={item.name} />
            </ListItem>
      );
    }
    
    return (
          <List component="nav">
            {listitems}
          </List>
    );
  }
}

