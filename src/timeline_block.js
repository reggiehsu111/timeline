import React from "react";
import iconApplication from "./image/icon-application.png"
import './css/style.css';
import './css/navbar.css';
import './css/reset.css';

class Timeline_block extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			location: this.props.location,
			time: this.props.time,
			sick: this.props.sick,
			city: this.props.city,
			event: this.props.event,
			transportation: this.props.transportation,
			key: this.props.key
		};
		this.myRef = React.createRef();
	}
	insertEvent = () => {
		var blocks = [];
		for (var i=0; i<this.state.event.length; i++){
				blocks.push(
					<h4>{this.state.event[i]}</h4>
				);
			}
		return blocks;
	}
	setClassName = () => {
		if (this.state.sick){
			return "cd-timeline-content sick";
		}else{
			return "cd-timeline-content";
		}
	}
	render(){
		var blockid, textStyle;
		   	blockid = "cd-timeline-content";
		    textStyle = {fontWeight:"normal"};
		console.log(this.state.sick);
		   // if (this.state.expand){
		   // 	textStyle = Object.assign({}, textStyle, {height:"20vh", fontSize:"20px"});
		   // }else{
		   // 	textStyle = Object.assign({}, textStyle, {height:"10vh"});
		   // }
		return(
            <div style={textStyle} className="cd-timeline-block">
                <div style={textStyle} className="cd-timeline-img cd-picture">
                    <img src={iconApplication} alt="Picture"></ img>
                </div>
                <div style={textStyle} id={blockid} className={this.setClassName()}>
                    <h4>{this.insertEvent()}</h4>
                    <p>
                    <span className="cd-date">{this.state.time}</span>
                    </p>
                </div>
            </div>
		);
	}
}

export default Timeline_block;