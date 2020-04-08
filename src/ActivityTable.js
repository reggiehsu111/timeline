import React from 'react';
import './css/table.css';

class ActivityTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activityList: this.props.activityList
        };
    }

    insertEvents = (events) => {
    	var blocks = [];
    	for (var i=0; i<events.length; i++){
    		blocks.push(
    		<tr>
    			<td>{events[i]}</td>
    		</tr>
    		);
    	}
    	return blocks;
    }

    insertContents = () => {
        var blocks = [];
        var id, name;
        for (var i=0; i<this.state.activityList.length; i++){
            blocks.push(
            <tr>
                <td>{this.state.activityList[i].diff_day}</td>
                <td>{this.state.activityList[i].time}</td>
                {this.insertEvents(this.state.activityList[i].event)}
            </tr>
            )
        }
        return blocks;
    }
    insertTable = () => {
    	var blocks = [];
    	if (this.state.activityList.length==0){
    		return <div></div>
    	}else{
    		return (
    			<table id="activity_table">
	              <tr>
	                <th>距離確診天數</th>
	                <th>日期</th> 
	                <th>事件</th> 
	              </tr>
	              {this.insertContents()}
	            </table>
    			)
    	}
    }
    render(){
        return (
          this.insertTable()
        )
    }
}

export default ActivityTable;