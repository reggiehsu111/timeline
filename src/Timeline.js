import React from "react";
import iconApplication from "./image/icon-application.png"
import './css/style.css';
import './css/navbar.css';
import './css/reset.css';
import Timeline_block from "./timeline_block";

class Timeline extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: "Reggie",
			timelineBlocks: []
		};
		this.myRef = React.createRef();
	}
	componentDidMount(){
		// timeline 
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
	hideBlocks = (offset) => {
		this.state.timelineBlocks.forEach((element) => {
			( element.offsetTop > window.scrollTop+window.height*offset ) && element.find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		});
	}
	showBlocks(offset) {
		console.log("Show blocks")
		this.state.timelineBlocks.forEach((element) => {
			( element.offsetTop <= window.scrollTop+window.height*offset && element.find('.cd-timeline-img').hasClass('is-hidden') ) && element.find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
		});
	}
	render(){
		return(
		<section id="cd-timeline" className="cd-container">
			<Timeline_block ref={this.myRef}/>
			<Timeline_block ref={this.myRef}/>
			<Timeline_block ref={this.myRef}/>
			<Timeline_block ref={this.myRef}/>
			<Timeline_block ref={this.myRef}/>
			<Timeline_block ref={this.myRef}/>
			<Timeline_block ref={this.myRef}/>
			<Timeline_block ref={this.myRef}/>
			<Timeline_block ref={this.myRef}/>
			<Timeline_block ref={this.myRef}/>

		</section>
		);
	}
}

export default Timeline;