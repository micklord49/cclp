import React, { Component } from 'react';
import TagChip from './TagChip';
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
    };

    if(this.props.tags != null)
    {
        tags = this.props.tags.map(tag => (
                <TagChip key={tag.guid} guid={tag.guid} ondelete={()=>{this.onRemoveTag(tag.guid);}}/>
            ))
    }

    return (
        <div style={mycontainerstyle}>
            {tags}
        </div>
    );
  }
}

