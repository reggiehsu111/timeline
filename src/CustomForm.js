import React from "react";
import './css/form.css';

class CustomForm extends React.Component{
	constructor(props){
		super(props);
	}

	_handleKeyDown = (e) => {
	    if (e.key === 'Enter') {
	      this.props.postForm(e);
	    }
	  }

	render(){
		var textStyle = {fontSize:"2vh"}
		return(        
			<form className="form-style-4" onSubmit={this.props.postForm} onKeyDown={this._handleKeyDown}>
	          <label >
	          <span>Search By Id</span><input type="number" name="field2" required={true} onChange={this.props.changeHandler}/>
	          </label>
	          <p style={textStyle}>Please search by ID </p>
	          <p style={textStyle}> (8位數字) </p>
	          <input type="submit" value="Search" />
	        </form>
		);
	}
}

export default CustomForm;