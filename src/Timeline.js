import React from "react";
import iconApplication from "./image/icon-application.png"
import './css/style.css';
import './css/navbar.css';
import './css/reset.css';
import Timeline_block from "./timeline_block";
import BasicInfo from "./BasicInfo";

class Timeline extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id:0,
			timelineBlocks: [],
			show_subtitle: true,
			json: this.props.json
		};
		this.myRef = React.createRef();
	}
	componentWillReceiveProps(nextProps){
	    if(nextProps.json!==this.props.json){
	      this.setState({...this.state, json :nextProps.json, id: nextProps.json.id });
	    }
	  }
	initialize = () => {
		if(this.state.show_subtitle == true){
			return <p style={{fontSize:"5vh", paddingTop: "1%", marginBottom:"0px", paddingLeft: "5%"}}>
            Please search by ID
          </p>;
      	}
		else{
			var offset = 0.8;
			this.state.timelineBlocks.push(this.myRef.current);

			//hide timeline blocks which are outside the viewport
			this.hideBlocks(offset);

			//on scolling, show/animate timeline blocks when enter the viewport
			window.addEventListener('scroll', () => {
				(!window.requestAnimationFrame) 
					? setTimeout(() => { this.showBlocks(this.state.timelineBlocks, offset); }, 100)
					: window.requestAnimationFrame(() => { this.showBlocks(this.state.timelineBlocks, offset); });
			});
		}
	}
	hideBlocks = (offset) => {
		if (this.state.show_subtitle==true) return;
		this.state.timelineBlocks.forEach((element) => {
			( element.offsetTop > window.scrollTop+window.height*offset ) && element.find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		});
	}
	showBlocks(offset) {
		if (this.state.show_subtitle==true) return;
		this.state.timelineBlocks.forEach((element) => {
			( element.offsetTop <= window.scrollTop+window.height*offset && element.find('.cd-timeline-img').hasClass('is-hidden') ) && element.find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
		});
	}
	changeJson = (newJson) => {
		this.setState({json: newJson});
	}

	display_timeline_block = () => {
		var blocks = [];
		if (Object.keys(this.state.json).length===0 && this.state.json.constructor===Object){
			return <div></div>;
		}
		else{
			if (this.state.show_subtitle == true) this.setState({show_subtitle: false});
			var json = this.state.json;
			var contactor = json.contactor;
			blocks.push(<BasicInfo 
				information={json.information}
				health_condition={json.health_condition}
			/>);
			for (var i=0; i< contactor.public_area.length; i++){
				blocks.push(<Timeline_block 
					ref={this.myRef} 
					city={contactor.public_area[i].city}
					location = {contactor.public_area[i].location}
					time={contactor.public_area[i].time}
					transportation={contactor.public_area[i].transportation}
				/>);
			}
			console.log(blocks);
		}
		return blocks;
	}
	render() {
		return(
		<section id="cd-timeline" className="cd-container">
			{this.initialize()}
			{this.display_timeline_block()}
		</section>
		);
	}
}

export default Timeline;