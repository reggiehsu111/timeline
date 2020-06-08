import React from "react";
import iconApplication from "./image/icon-application.png"
import './css/style.css';
import './css/navbar.css';
import './css/reset.css';

class Timeline_block extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			time: this.props.time,
			events: this.props.events,
			key: this.props.key
		};
		this.myRef = React.createRef();
	}
	insertEvents = () => {
		var blocks = [], sick_blocks = [], activity_blocks = [];
		// parse sick info
		if ("sick" in this.state.events && this.state.events.sick.event.length>0){
			for (var i=0; i<this.state.events.sick.event.length; i++){
					sick_blocks.push(
						<h4>{this.state.events.sick.event[i]}</h4>
					);
				}
		}
		if ("act" in this.state.events && this.state.events.act.event.length>0){
			for (var i=0; i<this.state.events.act.event.length; i++){
					activity_blocks.push(
						<h4>{this.state.events.act.event[i]}</h4>
					);
				}
		}
		var text_style = {"float": "left", "width":"30%", "fontWeight":"bold", "color":"black", "fontSize":"16px"};
		var sick_style = {"visibility":"visible"};
		var activity_style = { "visibility":"visible"};
		if (sick_blocks.length == 0){
			sick_style.visibility = "hidden";
		}
		if (activity_blocks.length == 0){
			activity_style.visibility = "hidden";
		}
		blocks = [
		<div style={text_style} className="cd-date">
		    <p>
                {this.state.time}
            </p>
		</div>,
		<div style={sick_style} className="sick">
		{sick_blocks}
		</div>,
		<div style={activity_style} className="activity">
		{activity_blocks}
		</div>
		]
		return blocks;
	}
	render(){
		return(
            <div className="cd-timeline-block">
                {this.insertEvents()}
            </div>
		);
	}
}

export default Timeline_block;