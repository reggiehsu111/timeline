import React from "react";
import './css/form.css';

class CustomForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			search_type: "id"
		};
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
	  getType = () => {
	  	switch(this.state.search_type){
	  		case "id":
	  			return "number";
	  		case "region":
	  			return "text";
	  		case "gender":
	  			return "text";
	  	}
	  }

	render(){
		var textStyle = {fontSize:"2vh"}
		return(        
			<form className="form-style-4" onSubmit={this.props.postForm} onKeyDown={this._handleKeyDown}>
	          <label >
	          <select value={this.state.search_type} onChange={this.handleSelectChange}>
				<option value="id">ID</option>
				<option value="region">地區</option>
				<option value="gender">性別</option>
			  </select>
				<input type={this.getType()} name="field2" required={true} onChange={this.props.changeHandler}/>
	          </label>

	          
	          <p style={textStyle}>請依ID搜尋 </p>
	          <p style={textStyle}> (8位數字) </p>
	          <input type="submit" value="搜尋" style={{fontSize:"3vh"}}/>
	        </form>
		);
	}
}

export default CustomForm;