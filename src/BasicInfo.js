import React from "react";
import './css/style.css';
import './css/navbar.css';
import './css/reset.css';

class BasicInfo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			information: this.props.information,
			health_condition: this.props.health_condition
		};
		this.myRef = React.createRef();
	}
	InsertInformation = () => {
		var blocks = [];
		for (let [key, value] of Object.entries(this.state.information)) {
		  blocks.push(<p className="basic-info-text">{key}: {value}</p>)
		}
		return blocks;
	}
	InsertHealthCondition = () => {
		var blocks = [];
		for (let [key, value] of Object.entries(this.state.health_condition)) {
			blocks.push(<p className="basic-info-text">{key}:</p>);
			for (var i=0; i<value.length; i++){
				for (let [key1, value1] of Object.entries(value[i])){
					blocks.push(<p style={{marginLeft:"2em"}} className="basic-info-text">   {key1}: {value1}</p>);
				}
			}
			
		  // blocks.push(<p className="basic-info-text">{key}: {value}</p>)
		}
		return blocks;
	}
	render(){
		return(
            <div className="basic-info">
            	<h1 style={{fontSize: "large"}}> Basic Info</h1>
            	<br></br>
            	<div>
        			{this.InsertInformation()}
        		</div>
        		<div>
        			{this.InsertHealthCondition()}
        		</div>
	        </div>
		);
	}
}

export default BasicInfo;