import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class ViewTimes extends React.Component {

  render(){
    console.log();
    return (
      <div className="loading-circle">
        <CircularProgress className="circle"/>
      </div>
    )
  }
}
