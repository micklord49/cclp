import React, { Component } from 'react';
import TagChip from './TagChip';
import Paper from '@material-ui/core/Paper';
import { arrayIncludes } from '@material-ui/pickers/_helpers/utils';

export default class TagList extends Component {
  constructor(props) {
      super(props);
      this.state =  { alltags: Array() };
      //this.onRemoveTag = this.onRemoveTag.bind(this);
  }

  componentDidMount(){
  }



  onRemoveTag(guid)
  {
    this.props.onremovetag(guid);
  }

  render() 
  {
    let tags="";

    const mycontainerstyle ={ 
      maxHeight: 100,
      minHeight: 100,
      overflowX: "hidden",
      overflowY: "scroll",    
      display: "flex",  
      margin: 10,
      padding: 5,
    };

    if(this.props.tags != null)
    {
        tags = this.props.tags.map(tag => (
                <TagChip key={tag.guid} guid={tag.guid} ondelete={()=>{this.onRemoveTag(tag.guid);}}/>
            ))
    }

    return (
        <Paper variant="outlined" style={mycontainerstyle}>
            {tags}
        </Paper>
    );
  }
}

