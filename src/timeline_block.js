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
			city: this.props.city,
			transportation: this.props.transportation,
			hover: false,
			expand: false,
			key: this.props.key
		};
		this.myRef = React.createRef();
	}
	toggleHover = () => {
		this.setState({hover: !this.state.hover});
	}
	handleClick = () => {
		this.setState({expand: !this.state.expand});
	}
	expand = () => {
		var expandStyle = {
			fontSize: "15px"
		}
		if (this.state.expand){
			return [
				<p style={expandStyle}>{this.state.time}</p>,
				<p style={expandStyle}>城市: {this.state.city}</p>, 
				<p style={expandStyle}>交通方式: {this.state.transportation}</p>
			];
		}else{
			return [<p>
                    <span className="cd-date">{this.state.time}</span>
                    </p>,
                    <br></br>]
		}
	}
	render(){
		var blockid, textStyle;
		   if (this.state.hover) {
		   	 blockid = "cd-timeline-content-hover"
		     textStyle = {fontWeight:"bold"};
		   } else {
		   	 blockid = "nothing";
		     textStyle = {fontWeight:"normal"};
		   }
		   if (this.state.expand){
		   	textStyle = Object.assign({}, textStyle, {height:"20vh", fontSize:"20px"});
		   }else{
		   	textStyle = Object.assign({}, textStyle, {height:"10vh"});
		   }
		return(
            <div style={textStyle} className="cd-timeline-block" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick={this.handleClick}>
                <div style={textStyle} className="cd-timeline-img cd-picture">
                    <img src={iconApplication} alt="Picture"></ img>
                </div>
                <div style={textStyle} id={blockid} className="cd-timeline-content">
                    <h4>{this.state.location}</h4>
                    
                    {this.expand()}
                </div>
            </div>
		);
	}
}

export default Timeline_block;