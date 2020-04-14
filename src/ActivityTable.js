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
            for (var j=0; j<this.state.activityList[i].event.length; j++){
                blocks.push(
                    <tr>
                        <td style={{width:"30%"}}>{this.state.activityList[i].diff_day}</td>
                        <td>{this.state.activityList[i].date}</td>
                        <td>{this.state.activityList[i].event[j]}</td>
                    </tr>
                    )
            }
            
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
                    <th>距離發病天數</th>
                    <th>日期</th> 
                    <th>事件</th> 
                  </tr>
                  {this.insertContents()}
                </table>
                )
        }
    }
    render(){
        console.log(this.state.activityList);
        return (
          this.insertTable()
        )
    }
}

export default ActivityTable;