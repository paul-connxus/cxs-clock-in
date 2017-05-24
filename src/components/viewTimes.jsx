import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

var allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])

export default class ViewTimes extends React.Component {

  render(){
    var myEventsList = []
    const style ={
      paddingTop: '4.7em'
    }
    return (
      <BigCalendar
        style={style}
        events={myEventsList}
        selectable
        defaultDate={new Date()}
      />
    )
  }
}
