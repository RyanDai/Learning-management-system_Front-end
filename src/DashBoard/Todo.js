import React, { Component } from 'react';
import Button from "../UI/Button";
import TodoList from "./TodoList";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input:"",
            nextId:2,
            todos:[
                {id:0,text:"hello",done:false},
                {id:1,text:"great!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",done:false},
            ]

        }
    }

    handleInput=(e)=>{
        this.setState({input:e.target.value})
    }

    addToList=()=>{
        const {nextId, input} = this.state;
        let items = this.state.todos;
        const newItem = {
            id: nextId,
            text: input,
            done:false
        }
        items.push(newItem);
        this.setState({
            todos:items,
            nextId: nextId+1,
            input:""
        })
    }

    removeFromList=(id)=>{
        let items = this.state.todos;
        for(let i = 0; i < items.length; i++) {
            let item = items[i];

            if(item.id === id){
                items.splice(i,1);
                break;
            }
        }
        this.setState({todos:items});
    }

    handleTaskState=(id)=>{
        let items = this.state.todos;
        for(let i = 0; i < items.length; i++) {
            let item = items[i];

            if(item.id === id){
                item.done = !item.done;
                break;
            }
        }
        this.setState({todos:items});
    }

    inputField=()=>{
        return(
            <div>
                <input type={"text"} value={this.state.input} onChange={this.handleInput}/>
                <Button primary onClick={this.addToList}> Add </Button>
            </div>
        );
    }
    render() {
        return(
            <MuiThemeProvider>
                <div className={"todo-wrapper dash-component-wrapper"}>
                    <h1>To-do List</h1>
                    {this.inputField()}
                    <TodoList items={this.state.todos} delete={this.removeFromList} check={this.handleTaskState}/>
                </div>
            </MuiThemeProvider>
        )
    }
}