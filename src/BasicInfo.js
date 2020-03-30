import React from "react";
import './css/style.css';
import './css/navbar.css';
import './css/reset.css';

class BasicInfo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			information: this.props.information,
			health_condition: this.props.health_condition,
			close_contactor: this.props.close_contactor,
			summary: this.props.summary,
			key: this.props.key,
			expand_info: true,
			expand_health: false,
			expand_close_contactor: false,
			expand_summary:false,
			hoverInfo: false,
			hoverHealth: false,
			hoverContactor: false,
			hoverSummary: false
		};
		this.myRef = React.createRef();
	}
	toggle_expand_info = () => {
		this.setState({expand_info: !this.state.expand_info});
	}
	toggle_expand_health = () => {
		this.setState({expand_health: !this.state.expand_health});
	}
	toggle_expand_summary = () => {
		this.setState({expand_summary: !this.state.expand_summary});
	}
	toggleHoverInfo = () => {
		this.setState({hoverInfo: !this.state.hoverInfo});
	}
	toggleHoverHealth = () => {
		this.setState({hoverHealth: !this.state.hoverHealth});
	}
	toggle_expand_contactor = () => {
		this.setState({expand_close_contactor: !this.state.expand_close_contactor});
	}
	toggleHoverContactor = () => {
		this.setState({hoverContactor: !this.state.hoverContactor});
	}
	toggleHoverSummary = () => {
		this.setState({hoverSummary: !this.state.hoverSummary});
	}

	InsertCloseContactor = () => {
		var blocks = [];
		if (this.state.expand_close_contactor){
			blocks.push(
				<h1 style={{fontSize: "4vh"}}> Close Contactor</h1>,
            	<br></br>
            );
            for (var i=0; i<this.state.close_contactor.length; i++){
				for (let [key, value] of Object.entries(this.state.close_contactor[i])) {
				  blocks.push(<p className="basic-info-text">{key}: {value}</p>)
				}
				blocks.push(<br></br>);
			}
			blocks.push(<br></br>)
		} else{
			blocks.push(
				<h1 style={{fontSize: "4vh"}}> Close Contactor</h1>,
            	<br></br>
            );
		}
		return blocks;
	}
	InsertInformation = () => {
		var blocks = [];
		if (this.state.expand_info){
			blocks.push(
				<h1 style={{fontSize: "4vh"}}> Basic Info</h1>,
            	<br></br>
            );
			for (let [key, value] of Object.entries(this.state.information)) {
			  blocks.push(<p className="basic-info-text">{key}: {value}</p>)
			}
			blocks.push(<br></br>)
		} else{
			blocks.push(
				<h1 style={{fontSize: "4vh"}}> Basic Info</h1>,
            	<br></br>
            );
		}
		return blocks;
	}
	InsertHealthCondition = () => {
		var blocks = [];
		if (this.state.expand_health){
			blocks.push(
				<h1 style={{fontSize: "4vh"}}> Health Condition </h1>,
            	<br></br>
            );
			for (let [key, value] of Object.entries(this.state.health_condition)) {
				blocks.push(<p className="basic-info-text">{key}:</p>);
				for (var i=0; i<value.length; i++){
					for (let [key1, value1] of Object.entries(value[i])){
						blocks.push(<p style={{marginLeft:"2em"}} className="basic-info-text">   {key1}: {value1}</p>);
					}
				}
			}
			blocks.push(<br></br>);
		}else{
			blocks.push(
				<h1 style={{fontSize: "4vh"}}> Health Condition </h1>,
            	<br></br>
            );
		}
		return blocks;
	}
	InsertSummary = () => {
		var blocks = [];
		if (this.state.expand_summary){
			blocks.push(
				<h1 style={{fontSize: "4vh"}}> Summary</h1>,
            	<br></br>
            );
            // console.log(this.state.summary.summary_part2);
			blocks.push(<p className="basic-info-text">{this.state.summary.summary_part1}</p>);
			blocks.push(<p className="basic-info-text">============== 病程史 ==============</p>);
			for (var i=0; i<this.state.summary.summary_part2.sick_history_info.length; i++){
				var sick_info = this.state.summary.summary_part2.sick_history_info[i];
				blocks.push(
					<p className="basic-info-text">{sick_info.date}: {sick_info.event}</p>
				)
				// console.log(this.state.summary.summary_part2.sick_history_info[i])
			}
			blocks.push(<br></br>)
			blocks.push(<p className="basic-info-text">============== 活動史 ==============</p>);
			for (var i=0; i<this.state.summary.summary_part2.activity_info.length; i++){
				var activity_info = this.state.summary.summary_part2.activity_info[i];
				// console.log("activity_info length:", activity_info.event.legnth)
				blocks.push(
					<p className="basic-info-text">{activity_info.date}: {activity_info.event[0]}</p>
				)
				for (var j=1; j<activity_info.event.length; j++){
						blocks.push(<p style={{marginLeft:"7.1em"}} className="basic-info-text">{activity_info.event[j]}</p>);
					}
			}
			blocks.push(<br></br>);
			blocks.push(<p className="basic-info-text">{this.state.summary.summary_part3}</p>);
			blocks.push(<br></br>)
		} else{
			blocks.push(
				<h1 style={{fontSize: "4vh"}}>Summary</h1>,
            	<br></br>
            );
		}
		return blocks;
	}
	render(){
		var infoStyle, healthStyle, contactorStyle, summaryStyle;
		if (this.state.hoverInfo) {
		     infoStyle = {fontWeight:"bold"};
		   } else {
		     infoStyle = {fontWeight:"normal"};
		   }
		if (this.state.hoverHealth) {
		     healthStyle= {fontWeight:"bold"};
		   } else {
		     healthStyle = {fontWeight:"normal"};
		   }
		if (this.state.hoverContactor) {
		     contactorStyle = {fontWeight:"bold"};
		   } else {
		     contactorStyle = {fontWeight:"normal"};
		   }
		if (this.state.hoverSummary) {
		     summaryStyle = {fontWeight:"bold"};
		   } else {
		     summaryStyle = {fontWeight:"normal"};
		   }
		return(
            <div className="basic-info">
            	<div style={infoStyle} onClick={this.toggle_expand_info} onMouseEnter={this.toggleHoverInfo} onMouseLeave={this.toggleHoverInfo}>
        			{this.InsertInformation()}
        		</div>
        		<div style={healthStyle} onClick={this.toggle_expand_health} onMouseEnter={this.toggleHoverHealth} onMouseLeave={this.toggleHoverHealth}>
        			{this.InsertHealthCondition()}
        		</div>
        		<div style={contactorStyle} onClick={this.toggle_expand_contactor} onMouseEnter={this.toggleHoverContactor} onMouseLeave={this.toggleHoverContactor}>
        			{this.InsertCloseContactor()}
        		</div>
        		<div style={summaryStyle} onClick={this.toggle_expand_summary} onMouseEnter={this.toggleHoverSummary} onMouseLeave={this.toggleHoverSummary}>
        			{this.InsertSummary()}
        		</div>
	        </div>
		);
	}
}

export default BasicInfo;