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
	          <span>依ID搜尋</span><input type="number" name="field2" required={true} onChange={this.props.changeHandler}/>
	          </label>
	          <p style={textStyle}>請依ID搜尋 </p>
	          <p style={textStyle}> (8位數字) </p>
	          <input type="submit" value="搜尋" style={{fontSize:"3vh"}}/>
	        </form>
		);
	}
}

export default CustomForm;