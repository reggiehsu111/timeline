import React from "react";
import './css/form.css';

class CustomForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			search_type: "id"
		};
		this.information_chinese = {
			 inv_date: '調查日期',
		     inv_person: '調查人',
		     report_date: '通報日期',
		     name: '姓名',
		     gender: '生理性別',
		     birth_date: '出生日期',
		     nationality: '國籍',
		     address: '居住地',
		     contact: '聯絡方式',
		     occupation: '職業',
		     med_title: '是否為醫療人員',
		     onset: '確診日期',
		     married: '婚姻狀況' 
		}
		this.input_type = {
			 id: 'number',
			 inv_date: 'date',
		     inv_person: 'text',
		     report_date: 'date',
		     name: 'text',
		     gender: 'text',
		     birth_date: 'date',
		     nationality: 'text',
		     address: 'text',
		     contact: 'number',
		     occupation: 'text',
		     med_title: 'text',
		     onset: 'date',
		     married: 'text' 
		}
		this.option_style = { fontSize:"2vh" };
		this.input_style = {fontSize:"2vh"};
	}

	insertOptions = () => {
		var blocks = [];
		for (let [key, value] of Object.entries(this.information_chinese)){
			blocks.push(<option value={key} style={this.option_style}>{value}</option>);
		}
		return blocks;
	}
	_handleKeyDown = (e) => {
	    if (e.key === 'Enter') {
	      this.props.postForm(e);
	    }
	  }

	 handleSelectChange = (event) => {
	    this.setState({search_type: event.target.value});
	    this.props.changeSearchType(event.target.value);
	  }

	submitForm = (e) => {
		this.props.postForm(e);
	}

	render(){
		var textStyle = {fontSize:"2vh"}
		return(        
			<form className="form-style-4" onSubmit={this.submitForm} onKeyDown={this._handleKeyDown}>
	          <label >
	          <select value={this.state.search_type} onChange={this.handleSelectChange}>
				<option value="id" style={this.option_style}>ID</option>
				{this.insertOptions()}
			  </select>
				<input type={this.input_type[this.state.search_type]} style={this.input_style} required={true} onChange={this.props.changeHandler}/>
	          </label>

	          
	          <p style={textStyle}>請依ID搜尋 </p>
	          <p style={textStyle}> (8位數字) </p>
	          <input type="submit" value="搜尋" style={{fontSize:"3vh"}}/>
	        </form>
		);
	}
}

export default CustomForm;