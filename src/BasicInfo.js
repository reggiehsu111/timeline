import React from "react";
import ActivityTable from './ActivityTable';
import './css/style.css';
import './css/navbar.css';
import './css/reset.css';

class BasicInfo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			information: this.props.information,
			health_condition: this.props.health_condition,
			contactor: this.props.contactor,
			source: this.props.source,
			summary: this.props.summary,
			key: this.props.key,
			expand_info: true,
			expand_health: false,
			expand_close_contactor: false,
			expand_source: false,
			expand_summary:false,
			expand_activity:false,
			hoverInfo: false,
			hoverHealth: false,
			hoverContactor: false,
			hoverSummary: false,
			hoverSource: false,
			hoverActivity: false
		};
		this.myRef = React.createRef();
	}
	toggle_expand_info = () => {
		if (this.state.expand_info == true){
			this.mouseLeave();
		}
		this.setState({expand_info: !this.state.expand_info});
	}
	toggle_expand_health = () => {
		if (this.state.expand_health == true){
			this.mouseLeave();
		}
		this.setState({expand_health: !this.state.expand_health});
	}
	toggle_expand_source = () => {
		if (this.state.expand_source == true){
			this.mouseLeave();
		}
		this.setState({expand_source: !this.state.expand_source});
	}
	toggle_expand_summary = () => {
		if (this.state.expand_summary == true){
			this.mouseLeave();
		}
		this.setState({expand_summary: !this.state.expand_summary});
	}
	toggle_expand_activity = () => {
		if (this.state.expand_activity == true){
			this.mouseLeave();
		}
		this.setState({expand_activity: !this.state.expand_activity});
	}
	toggleHoverInfo = () => {
		this.setState({hoverInfo: !this.state.hoverInfo});
	}
	toggleHoverHealth = () => {
		this.setState({hoverHealth: !this.state.hoverHealth});
	}
	toggleHoverSource = () => {
		this.setState({hoverSource: !this.state.hoverSource});
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
	toggleHoverActivity = () => {
		this.setState({hoverActivity: !this.state.hoverActivity});
	}
	mouseEnter = () => {
		document.body.style.cursor = "pointer";
	}
	mouseLeave = () => {
		document.body.style.cursor = "default";
	}
	InsertCloseContactor = () => {
		var blocks = [];
		if (this.state.expand_close_contactor){
			blocks.push(
				<h1 style={{fontSize: "4vh", width:"80%", float:"left"}}>接觸者調查</h1>,
				<p style={{fontSize: "2vh", width:"20%", float:"right"}} onClick={this.toggle_expand_contactor} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}> 關閉 </p>,
            	<br></br>
            );
            blocks.push(<br></br>);
			for (let [key, value] of Object.entries(this.state.contactor)) {
			  blocks.push(<p className="basic-info-text">{key}:</p>)
				for (var i=0; i<value.length; i++){
					for (let [key1, value1] of Object.entries(value[i])){
						blocks.push(<p style={{marginLeft:"2em"}} className="basic-info-text">   {key1}: {value1}</p>);
					}
				}
			}
			blocks.push(<br></br>)
		} else{
			blocks.push(
				<h1 style={{fontSize: "4vh"}} onClick={this.toggle_expand_contactor}>接觸者調查</h1>,
            	<br></br>
            );
		}
		return blocks;
	}
	InsertInformation = () => {
		var blocks = [];
		if (this.state.expand_info){
			blocks.push([
				<h1 style={{fontSize: "4vh", width:"80%", float:"left"}}> 基本資料</h1>,
				<p style={{fontSize: "2vh", width:"20%", float:"right"}} onClick={this.toggle_expand_info} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}> 關閉 </p>,
            	<br></br>
            	]
            );
            blocks.push(<br></br>);
			for (let [key, value] of Object.entries(this.state.information)) {
			  blocks.push(<p className="basic-info-text">{key}: {value}</p>);
			}
			blocks.push(<br></br>);
		} else{
			blocks.push(
				<h1 style={{fontSize: "4vh"}} onClick={this.toggle_expand_info} > 基本資料</h1>,
            	<br></br>
            );
		}
		return blocks;
	}
	InsertHealthCondition = () => {
		var blocks = [];
		if (this.state.expand_health){
			blocks.push([
				<h1 style={{fontSize: "4vh", width:"80%", float:"left"}}> 臨床狀況</h1>,
				<p style={{fontSize: "2vh", width:"20%", float:"right"}} onClick={this.toggle_expand_health} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}> 關閉 </p>,
            	<br></br>
            	]
            );
            blocks.push(<br></br>);
            var count = 0;
			for (let [key, value] of Object.entries(this.state.health_condition)) {
				blocks.push(<p className="basic-info-text">{key}:</p>);
				count += 1;
				if(count < 3){
					for (var i=0; i<value.length; i++){
						for (let [key1, value1] of Object.entries(value[i])){
							blocks.push(<p style={{marginLeft:"2em"}} className="basic-info-text">   {key1}: {value1}</p>);
						}
					}
				}
				else{
					blocks.push(<p style={{marginLeft:"2em"}} className="basic-info-text">{value}</p>);
				}
			}
			blocks.push(<br></br>);
		}else{
			blocks.push(
				<h1 style={{fontSize: "4vh"}} onClick={this.toggle_expand_health}> 臨床狀況 </h1>,
            	<br></br>
            );
		}
		return blocks;
	}
	InsertSource = () => {
		var blocks = [];
		if(this.state.expand_source){
			blocks.push(
				<h1 style={{fontSize: "4vh", width:"80%", float:"left"}}> 暴露來源調查</h1>,
				<p style={{fontSize: "2vh", width:"20%", float:"right"}} onClick={this.toggle_expand_source} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}> 關閉 </p>,
            	<br></br>
			);
			blocks.push(<br></br>);
			var count = 0;
			for (let [key, value] of Object.entries(this.state.source)) {
				blocks.push(<p className="basic-info-text">{key}:</p>);
				count += 1;
				if(count < 5){
					for (var i=0; i<value.length; i++){
						for (let [key1, value1] of Object.entries(value[i])){
							blocks.push(<p style={{marginLeft:"2em"}} className="basic-info-text">   {key1}: {value1}</p>);
						}
					}
				}
				else{
					blocks.push(<p style={{marginLeft:"2em"}} className="basic-info-text">{value}</p>);
				}
			}
			blocks.push(<br></br>)
		}else{
			blocks.push(
				<h1 style={{fontSize: "4vh"}} onClick={this.toggle_expand_source}>暴露來源調查</h1>,
            	<br></br>
            );
		}
		return blocks;
	}
	InsertSummary = () => {
		var blocks = [];
		if (this.state.expand_summary){
			blocks.push(
				<h1 style={{fontSize: "4vh", width:"80%", float:"left"}}> 概述</h1>,
				<p style={{fontSize: "2vh", width:"20%", float:"right"}} onClick={this.toggle_expand_summary} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}> 關閉 </p>,
            	<br></br>
            );
            // console.log(this.state.summary.summary_part2);
            blocks.push(<br></br>);
			blocks.push(<p className="basic-info-text">{this.state.summary.summary_part1}</p>);
			if (this.state.summary.summary_part2.sick_history_info.length > 0){
				blocks.push(<p className="basic-info-text">======= 病程史 =======</p>);
				for (var i=0; i<this.state.summary.summary_part2.sick_history_info.length; i++){
					var sick_info = this.state.summary.summary_part2.sick_history_info[i];
					blocks.push(
						<p className="basic-info-text">{sick_info.date}: {sick_info.event}</p>
					)
					// console.log(this.state.summary.summary_part2.sick_history_info[i])
				}
			}
			blocks.push(<br></br>)
			for (var i=0; i<this.state.summary.summary_part3.length; i++){
				blocks.push(<p className="basic-info-text">{this.state.summary.summary_part3[i]}</p>)
			}
			// blocks.push(<p className="basic-info-text">{this.state.summary.summary_part3}</p>);
			blocks.push(<br></br>)
		} else{
			blocks.push(
				<h1 style={{fontSize: "4vh"}} onClick={this.toggle_expand_summary}>概述</h1>,
            	<br></br>
            );
		}
		return blocks;
	}
	InsertActivity = () => {
		if (this.state.expand_activity){
			return([
				<h1 style={{fontSize: "4vh", width:"80%", float:"left", marginBottom:"5vh"}}> 活動史</h1>,
				<p style={{fontSize: "2vh", width:"20%", float:"right"}} onClick={this.toggle_expand_activity} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}> 關閉 </p>,
            	<ActivityTable style={{marginTop:"5vh"}} activityList={this.state.summary.summary_part2.activity_info}/>
			]);
		}else{
			return([
				<h1 style={{fontSize: "4vh"}} onClick={this.toggle_expand_activity}>活動史</h1>,
            	<br></br>
			]);
		}
	}
	render(){
		var infoStyle, healthStyle, contactorStyle, summaryStyle, sourceStyle, activityStyle;
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
		if (this.state.hoverSource) {
		     sourceStyle = {fontWeight:"bold"};
		   } else {
		     sourceStyle = {fontWeight:"normal"};
		   }
		 if (this.state.hoverActivity) {
		     activityStyle = {fontWeight:"bold"};
		   } else {
		     activityStyle = {fontWeight:"normal"};
		   }
		return(
            <div className="basic-info">
            	<div style={infoStyle} onMouseEnter={this.toggleHoverInfo} onMouseLeave={this.toggleHoverInfo}>
        			{this.InsertInformation()}
        		</div>
        		<div style={healthStyle} onMouseEnter={this.toggleHoverHealth} onMouseLeave={this.toggleHoverHealth}>
        			{this.InsertHealthCondition()}
        		</div>
        		<div style={sourceStyle} onMouseEnter={this.toggleHoverSource} onMouseLeave={this.toggleHoverSource}>
        			{this.InsertSource()}
        		</div>
        		<div style={contactorStyle} onMouseEnter={this.toggleHoverContactor} onMouseLeave={this.toggleHoverContactor}>
        			{this.InsertCloseContactor()}
        		</div>
        		<div style={summaryStyle} onMouseEnter={this.toggleHoverSummary} onMouseLeave={this.toggleHoverSummary}>
        			{this.InsertSummary()}
        			
        		</div>
        		<div style={activityStyle} onMouseEnter={this.toggleHoverActivity} onMouseLeave={this.toggleHoverActivity}>
        			{this.InsertActivity()}
        		</div>
	        </div>
		);
	}
}

export default BasicInfo;