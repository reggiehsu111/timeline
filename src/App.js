import React from 'react';
import Timeline from './Timeline';
import CustomForm from './CustomForm';
import './css/main.css';
import './css/navbar.css';
import './css/reset.css';
import './css/style.css';
import './css/form.css';

class App extends React.Component {
  constructor(props){
    super(props);
    // this.timeline_element = React.createRef();
    // this.handler = this.handler.bind(this);
    this.postForm = this.postForm.bind(this);
    this.state = {
      id: 0,
      return_json:{}
    };
    this.changeHandler = this.changeHandler.bind(this);

  }
  postForm(event) {
    // console.log(typeof(this.timeline_element));
    var currentComponent = this;
      event.preventDefault();
      const data = this.state.id;
      fetch('/form-submit-url', {
        method: 'POST',
        body: JSON.stringify({id: data}),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          // console.log(myJson.contactor.public_area);
          currentComponent.setState({return_json: myJson});
          // this.timeline_element.current.changeJson(myJson);
        });
   }

  changeHandler(event){
    event.preventDefault();
    this.setState({id: event.target.value});
   }
  render(){
    return (
      <div>
        <header style={{height:"15vh", paddingTop: "0%", marginTop: "0%"}}>
          <p style={{fontSize:"5vh", paddingTop: "4%", marginBottom:"0px"}}>
            Timeline
          </p>
        </header>
        <CustomForm  postForm={this.postForm} changeHandler={this.changeHandler}/>
        <Timeline json={this.state.return_json} />
      </div>
    );
  }
}

export default App;
