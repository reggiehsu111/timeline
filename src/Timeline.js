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
			time_info: this.props.json.time_info,
			summary: this.props.json.summary,
			timelineBlocks: [],
			show_subtitle: true,
			json: this.props.json,
			id: this.props.id,
			key: 0
		};
		this.myRef = React.createRef();
	}
	componentWillReceiveProps(nextProps){
	    if(nextProps.json!==this.props.json){
	      this.setState({json :nextProps.json, summary: nextProps.json.summary});
	    }
	  }
	initialize = () => {
		if(this.state.show_subtitle == true){
			return [<div></div>];
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
	increment_key = () => {
		this.state.key ++;
		return this.state.key;
	}
	combine_infos = (activity_info, sick_info) => {
		for (var i=0; i<activity_info.length; i++){
			activity_info[i].sick = 0;
		}
		for (var i=0; i<sick_info.length; i++){
			sick_info[i].sick = 1;
		}
		var time_dict = {};
		for (var i=0; i<activity_info.length; i++){
			time_dict[activity_info[i].date] = {"act":activity_info[i]};
		}
		for (var i=0; i<sick_info.length; i++){
			if (sick_info[i].date in time_dict){
				time_dict[sick_info[i].date].sick = sick_info[i];
			}
			else{
				time_dict[sick_info[i].date] = {"sick":sick_info[i]};
			}
		}
		// console.log(time_dict);
		// var time_list = activity_info.concat(sick_info);
		// time_list.sort(function(a,b){
		//     switch (a.date > b.date) {
		//         case true:
		//             return 1;
		//         default:
		//             return -1;
		//     };
	 //    })
		return time_dict
	}

	display_timeline_block = () => {
		var activity_info, sick_info=[];
		var time_dict = {};
		var blocks = [];
		if (this.state.summary !== undefined){
			activity_info = this.state.summary.summary_part2.activity_info;
			sick_info = this.state.summary.summary_part2.sick_history_info;
			time_dict = this.combine_infos(activity_info, sick_info);
			// time_list = this.combine_infos(activity_info, sick_info);
		}
		if (Object.keys(this.state.json).length===0 && this.state.json.constructor===Object){
			return <div></div>;
		}
		else{
			if (this.state.show_subtitle == true) this.setState({show_subtitle: false});
			var json = this.state.json.dict;
			this.increment_key();
			blocks.push(<div style={{width:"60%", float:"left"}}>,<BasicInfo 
				id={json.id}
				information={json.information}
				health_condition={json.health_condition}
				contactor={json.contactor}
				source={json.source}
				summary={this.state.summary}
				key={this.state.key}
			/>,</div>);

			var sub_blocks = [];
			for (let [key, value] of Object.entries(time_dict)){
				this.increment_key();
				sub_blocks.push(
					<Timeline_block 
						ref={this.myRef}
						time={key}
						events={value}
						key={this.state.key}
					/>
				);
			}
			blocks.push(
				<div style={{width:"20%", float:"right"}}>
					<div style={{width:"20%", float:"left"}}>
						<span className="dot-sick"></span><p>病程史</p>
					</div>
					<div style={{width:"80%", float:"right"}}>
						<span className="dot-not-sick"></span><p>活動史</p>
					</div>
				</div>
			);
			blocks.push(
				<div style={{width:"40%", float:"right"}}>,
				{sub_blocks},
				</div>
			)
			// console.log(blocks);
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