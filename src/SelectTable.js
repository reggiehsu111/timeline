import React from 'react';
import './css/table.css';

class SelectTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id_names: this.props.json.id_names,
            key: this.props.key
        };
    }

    handleClick = (event) => {
        event.preventDefault();
        var id = event.currentTarget.id;
        this.props.postForm(event, id, "id");
        // const change = new Promise( () => {
        //     this.props.changeSearchType("id");
        //     this.props.changeSearchValue(id);
        //     return event;
        // }).then((event) => {
        //     this.props.postForm(event);
        // }).catch(
        //     (e) => {console.log(e);}
        // );

    }
    mouseEnter = () => {
		document.body.style.cursor = "pointer";
	}
	mouseLeave = () => {
		document.body.style.cursor = "default";
	}

    insertContents = () => {
        var blocks = [];
        var id, name;
        for (var i=0; i<this.state.id_names.length; i++){
            if (this.state.id_names[i].id !== undefined){
                blocks.push(
                <tr id={this.state.id_names[i].id} onClick={this.handleClick} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                    <td>{this.state.id_names[i].id}</td>
                    <td>{this.state.id_names[i].information.name}</td>
                </tr>
                )
            }
        }
        return blocks;
    }
    render(){
        return (
        <div style={{  marginLeft:"3vw", marginRight:"3vw"}}>
          <table id="select_table">
              <tr>
                <th>ID</th>
                <th>姓名</th> 
              </tr>
              {this.insertContents()}
            </table>
        </div>
        )
    }
}

export default SelectTable;