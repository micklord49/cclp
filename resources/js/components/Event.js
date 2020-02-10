import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//
//  Material UI Controls
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
    Calendar,
    DateLocalizer,
    momentLocalizer,
    globalizeLocalizer,
    move,
    Views,
    Navigate,
    components,
  } from 'react-big-calendar'
  
import moment, { now } from 'moment'

//
//  Icons
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';

//
//  CCLP Components
import EventInfo from './EventInfo';

export default class Event extends Component {
  constructor(props) {
      super(props);
      this.state = {
          events: new Array(), 
          selectedevent: { guid: '' },
        };
      //this.selectRole = this.selectRole.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
  }

  selectEvent(r){
    console.log("Calling select event..."+r);
    console.log(this.state.events);
    for(let i=0;i<this.state.events.length;i++)
    {
      if(this.state.events[i].guid == r)  
      {
        console.log("Seting event..."+this.state.events[i]);
        this.setState({ selectedevent: this.state.events[i] });
      }
    }
  }

  handleChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(event);
  
    this.setState({
      [name]: value
    });
    console.log(this.state);

  }

  addnewevent() 
  {
    const event = {
      title: this.state.title,
      subtitle: this.state.subtitle,
      location: this.state.location,
      start: this.state.start,
      end: this.state.end,
      owner: this.props.owner,
    }

    let uri = '/event';
    axios.post(uri, event).then((response) => {
          //this.props.history.push('/display-item');
          this.refresh();
    });
  }

  componentDidMount(){
      this.refresh();
  }


  refresh()
  {
    if(this.props.owner=='')   return;
    axios.get("/event/" + this.props.owner + "/dir")
      .then(response => {
          console.log("Reloading events...");
          response.data.forEach(event => {
            event.start=new Date(event.start);
            event.end=new Date(event.end);
          });
          console.log(response);
          this.setState({  events: response.data });        
          if(response.data.length > 0)  this.setState({  selectedevent: response.data[0] });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  eventchanged()
  {
    if(this.props.owner=='')   return;
    console.log("Event - events changes");
    axios.get("/event/"+this.props.owner+"/edit")
    .then(response => {
      console.log("Reloading events...");
      response.data.events.forEach(event => {
        event.start=new Date(event.start);
        event.end=new Date(event.end);
      });
      console.log(response);
      this.setState({  events: response.data.events });        
      this.selectEvent(this.state.selectedevent.guid);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  onAdd(start, end ) {
    const title = window.prompt('New Event title')
    if (title)
    {
      this.setState({
        title: title,
        subtitle: '',
        location: '',
        start: start.start,
        end: start.end,
        owner: this.props.owner,
      });
      this.addnewevent();
      
    }
  }

  onSelect(e) {
    console.log(e);
      this.setState({
        selectedevent: e
      });
  }

  eventColor(e,start,end,selected)
  {
    if(start<now()) return { style: { backgroundColor: 'darkgray' } }
    if(selected)    return { style: { backgroundColor: 'mediumorchid' } }
    return { style: { backgroundColor: 'aquamarine' } }
  }


  render() 
  {
    
    const neu = {
      backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop:10,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    const localizer = momentLocalizer(moment) // or globalizeLocalizer
    const MyCalendar = props => (
        <div>
            <Calendar
                localizer={localizer}
                events={this.state.events}
                startAccessor="start"
                endAccessor="end"
                selectable
                style={{ height: 600 }}
                onSelectSlot={(start,end) => {this.onAdd(start,end);}}
                onSelectEvent={(e) => {this.onSelect(e);}}
                eventPropGetter={(event, start, end, isSelected) => {this.eventColor(event,start,end,isSelected);}}
            />
        </div>
      )
      

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <MyCalendar />
                </Grid>
                <Grid item xs={6}>
                    <EventInfo guid={this.state.selectedevent.resource} onChange={() => this.eventchanged()} />
                </Grid>
            </Grid>

        </div>
    );
  }
}

