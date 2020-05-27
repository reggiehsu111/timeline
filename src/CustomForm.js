import React from "react";
import './css/form.css';

class CustomForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			search_type: "id",
			search_value: 0,
			require_input: true
		};
		this.information_chinese = {
			inv_date: '調查日期',
			  inv_person: '調查人',
			  report_date: '通報日期',
			  name: '姓名',
			  gender: '生理性別',
			  birth_date: '出生日期',
			  nationality: '國籍',
			  address_city: '居住城市',
			  address_area: '居住區域',
			  address_detail: '居住地址',
			  contact: '聯絡方式',
			  occupation: '職業',
			  med_title: '是否為醫療人員',
			  onset: '確診日期',
			  married: '婚姻狀況' 
		};
		this.input_type = {
			 id: 'number',
			 inv_date: 'date',
		     inv_person: 'text',
		     report_date: 'date',
		     name: 'text',
		     gender: 'options',
		     birth_date: 'date',
		     nationality: 'text',
		     address_city: 'options',
			 address_area: 'text',
			 address_detail: 'text',
		     contact: 'number',
		     occupation: 'text',
		     med_title: 'text',
		     onset: 'date',
		     married: 'text' 
		}
		this.select_options = {
			gender: ['男','女'],
			address_city:['臺北市','新北市','基隆市','桃園市','新竹縣','新竹市','苗栗縣','臺中市','南投縣','彰化縣','雲林縣','嘉義縣','嘉義市','臺南市','高雄市','屏東縣','宜蘭縣','花蓮縣','臺東縣','澎湖縣','金門縣','連江縣']
		}
		this.option_style = { fontSize:"2vh" };
		this.input_style = {fontSize:"2vh", marginLeft:"2vw"};
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
	    this.setState({search_type: event.target.value, require_input: true});
	    this.props.changeSearchType(event.target.value);
	    if (this.input_type[event.target.value] == 'options'){
	    	this.setState({search_value: this.select_options[event.target.value][0]});
	    	this.props.changeSearchValue(this.select_options[event.target.value][0]);
	    }
	  }

	  handleValueChange = (event) => {
	  	this.setState({search_value: event.target.value});
	  	this.props.changeSearchValue(event.target.value);
	  }


	submitForm = (e) => {
		this.props.postForm(e);
	}

	insertInput = () => {
		if (this.input_type[this.state.search_type] !== 'options'){
			return <input type={this.input_type[this.state.search_type]} style={this.input_style} required={this.state.require_input} onChange={this.props.changeHandler}/>
		}
		else{
			var blocks = [];
			var options = this.select_options[this.state.search_type];
			for (var i=0; i<options.length; i++){
				blocks.push(<option value={options[i]} style={this.option_style}>{options[i]}</option>)
			}
			return [
				<select value={this.state.search_value} onChange={this.handleValueChange}>, 
				{blocks},
				</select>
			];
		}
	}
	searchAll = () => {
		this.setState({search_type: "all", require_input: false});
	  	this.props.changeSearchType("all");
	}
	render(){
		var textStyle = {fontSize:"2vh"}
		return(        
			<form className="form-style-4" onSubmit={this.submitForm} onKeyDown={this._handleKeyDown}>
	          <label >
	          <select value={this.state.search_type} onChange={this.handleSelectChange}>
				<option value="id" style={this.option_style}>法傳編號</option>
				{this.insertOptions()}
			  </select>
			  	{this.insertInput()}
	          </label>

	          
	          <p style={textStyle}>請選擇搜尋欄位</p>
	          <div style={{marginTop:"1vh"}}>
		          <input type="submit" value="搜尋" style={{fontSize:"3vh", width:"10%"}}/>
		          <input type="submit" value="所有資料" style={{fontSize:"3vh", marginLeft:"3vw", width:"10%"}} onClick={this.searchAll}/>
	          </div>
	        </form>
		);
	}
}

export default CustomForm;