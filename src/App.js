import React from 'react';
import Timeline from './Timeline';
import CustomForm from './CustomForm';
import SelectTable from './SelectTable';
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
      search_value: 0,
      stable_value:0,
      return_json:{},
      noinfo:false,
      search_type: "id",
      stable_type: "id",
      table_key: 0
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.changeSearchType = this.changeSearchType.bind(this);
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
  }
  incrementTableKey = () => {
    this.state.table_key++;
    return this.state.table_key;
  }
  postForm(event, search_value, search_type) {
    // console.log(typeof(this.timeline_element));
    var currentComponent = this;
      if (event !== undefined){
        event.preventDefault();
      }
      var data = this.state.search_value;
      var type = this.state.search_type;
      if (search_value !== undefined && search_type !== undefined){
        data = search_value;
        type = search_type;
      }
      fetch('/form-submit-url', {
        method: 'POST',
        body: JSON.stringify({search_type: type, search_value: data}),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
          if (type !== 'id' && myJson.id_names.length == 0 ){
              currentComponent.setState({return_json: myJson, noinfo: true, stable_value:data, stable_type:type});
          }else{
            currentComponent.setState({return_json: myJson, noinfo: false, stable_value:data, stable_type:type});
          }
          // currentComponent.timeline_element.current.display_timeline_block();
        })
        .catch(
          (e) => {
            currentComponent.setState({noinfo: true});
            currentComponent.setState({stable_value:data, stable_type:type});
          }
          );
   }
   gotinfo = () => {
    var outputStyle = {marginTop: "5vh", fontSize:"5vh", marginLeft:"3vh"}
    var gotStyle = {marginTop: "5vh", fontSize:"3vh", marginLeft:"3vh"}
      if (this.state.noinfo){
        if (this.state.stable_type == 'id'){
          return <p style={outputStyle}>找不到此ID: {this.state.stable_value}</p>;
        }else{
          return <p style={outputStyle}>找不到{this.information_chinese[this.state.stable_type]}: {this.state.stable_value}</p>;
        }
      }
      else{
        if (this.state.stable_type == 'id'){
          return <Timeline json={this.state.return_json}/>;
        }else{
          this.incrementTableKey();
          return ([
            <p style={gotStyle}>依 {this.information_chinese[this.state.stable_type]} 搜尋: {this.state.stable_value}</p>,
            <SelectTable json={this.state.return_json} postForm={this.postForm} key={this.state.table_key}/>
            ])
        }
      }
   }
  changeHandler(event){
    event.preventDefault();
    this.setState({search_value: event.target.value});
   }
   changeSearchType(search_type){
    this.setState({search_type: search_type});
   }
   changeSearchValue = (search_value) => {
    this.setState({search_value: search_value});
   }
  // setParent = (search_type, search_value) =>{
  //   this.setState({search_type: search_type, search_value:search_value}, this.postForm);
  // }

  render(){
    return (
      <div>
        <header style={{height:"15vh", paddingTop: "0%", marginTop: "0%"}}>
          <p style={{fontSize:"5vh", paddingTop: "4%", marginBottom:"0px"}}>
            嚴重特殊傳染性肺炎疫調報告
          </p>
        </header>
        <CustomForm  postForm={this.postForm} changeHandler={this.changeHandler} changeSearchType = {this.changeSearchType} changeSearchValue = {this.changeSearchValue}/>
        {this.gotinfo()}
      </div>
    );
  }
}

export default App;
