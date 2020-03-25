import React from "react";
import './css/form.css';

class CustomForm extends React.Component{
	constructor(props){
		super(props);
	}
	postForm(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    });
  }
	render(){
		return(        
			<form className="form-style-4" onSubmit={this.postForm}>
	          <label >
	          <span>Search By Id</span><input type="number" name="field2" required={true} />
	          </label>
	          <input type="submit" value="Search" />
	        </form>
		);
	}
}

export default CustomForm;