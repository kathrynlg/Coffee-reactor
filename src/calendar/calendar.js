import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import './css/react-big-calendar.css';
import CalendarCrud from './crud';
import myEventsList from '../events/events';
import EventItem from './EventItem';
import calEdit from './calEdit';
import uuid from 'node-uuid';
import TimePicker from './timePicker';

let title = '';
let desc = '';
let start = new Date();
let end = new Date();
let titleCheck = false;
let descCheck = false;
let startCheck = false;
let endCheck = false;



BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);
// const MyCalendar = props => (
//   <div>
//     <ul className ="nav nav-pills">
//       <li className="active"><a data-toggle="tab" href="#calendarMain">Home</a></li>
//       <li><a data-toggle="tab" href="#table">Home 1</a></li>
//     </ul>
// )
//

class MyCalendar extends Component{
  constructor(props){
    super(props);
    this.state={arr:myEventsList,title: ''}
  }

calDelete(index) {

  var newArr = [...this.state.arr];
  this.setState({arr:newArr},title:'');
  console.log(newArr);
  for(var key in newArr){
    if(newArr[key].id == index.id){
      newArr.splice(key,1);
    }
  }
  localStorage.setItem('myEventsList', JSON.stringify(newArr));

}

calNew() {
  var newArr = [...this.state.arr];

  this.setState({arr:newArr},title:'');
var newEventId;



  var newEvent = {
      'title': "New Event",
      'desc': 'new desc',
      'start': "2017-04-13T16:30:00.000Z",
      'end': "2017-04-13T16:30:00.000Z",
      'id': uuid()
  }

  newArr[newArr.length]= newEvent;
  console.log('newArr ',newArr);

  localStorage.setItem('myEventsList', JSON.stringify(newArr));
}

calSave(index, newTitle){
  if(descCheck){
    index.desc = desc;
  }
  if(titleCheck){
    index.title = this.state.title;
  }
  if(startCheck){
    index.start = start;
  }
  if(endCheck){
    index.end = end;
  }
  var newArr = [...this.state.arr];

  this.setState({arr:newArr},title:'');
  localStorage.setItem('myEventsList', JSON.stringify(this.state.arr));
  titleCheck, descCheck, startCheck, endCheck = false;
}


calEditTitle(e,item){
  console.log(e.target.value);
  this.setState({title:e.target.value});
  titleCheck = true;
  console.log('here ',e.target);
}
calEditDesc(e, item){
  descCheck = true;
  desc = e.target.value;
}
calEditStart(e,item){
  startCheck = true;
  start = e.target.value;
}
calEditEnd(e,item){
  endCheck = true;
  end = e.target.value;
}

  render(){

  const showEvents = this.state.arr.map((item) =>{
      return(

        <EventItem
          thisState={this.state.arr}
          key={item.id}
          calSave={this.calSave.bind(this)}
          calEditTitle={this.calEditTitle.bind(this)}
          calEditDesc={this.calEditDesc.bind(this)}
          calEditStart={this.calEditStart.bind(this)}
          calEditEnd={this.calEditEnd.bind(this)}
          calDelete={this.calDelete.bind(this)} item = {item}/>

      )
    })
    return(
      <div>
        <ul className="nav nav-pills">
          <li className="active"><a data-toggle="tab" href="#calendarMain">Home</a></li>
          <li><a data-toggle="tab" href="#table">Menu 1</a></li>
        </ul>
        <div className="tab-content">
          <div id="table" className="tab-pane fade">
            <button onClick={() => this.calNew()}>add</button>
            <table>
              <thead>
                <tr>
                  <th>title</th>
                  <th>descrption</th>
                  <th>start</th>
                  <th>end</th>
                  <th>Save</th>
                  <th>Delete</th>
                </tr>
                </thead>
                <tbody>
              {showEvents}
              </tbody>
            </table>
          </div>
          <div id ="calendarMain" className="tab-pane fade in active">
            <BigCalendar className="col-md-12"
              events={this.state.arr}
              style={{height: 400}}/>
          </div>
        </div>

        </div>
    )
  }
}


export default MyCalendar;
