import React from "react";
import iconApplication from "./image/icon-application.png"
import './css/style.css';
import './css/navbar.css';
import './css/reset.css';

class Timeline_block extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: "101"
		};
		this.myRef = React.createRef();
	}
	
	render(){
		return(
            <div className="cd-timeline-block">
                <div className="cd-timeline-img cd-picture">
                    <img src={iconApplication} alt="Picture"></ img>
                </div>
                <div className="cd-timeline-content">
                    <h4>{this.state.name}</h4>
                    <p>
                    </p>
                    <span className="cd-date">2020.03.16 08:00a.m. - 2020.03.16 09:00a.m.</span>
                </div>
            </div>
		);
	}
}

export default Timeline_block;