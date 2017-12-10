import React, { Component } from 'react';
import Button from "../UI/Button";
import TodoList from "./TodoList";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input:"",
            nextId:2,
            todos:[
                {id:0,text:"hello",done:false},
                {id:1,text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",done:false},
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
            <Row>
                <Col lg={9} md={10} sm={10}>
                <TextField
                    hintText="Let's do..."
                    floatingLabelText="Add New Task"
                    fullWidth={true}
                    value={this.state.input}
                    onChange={this.handleInput}
                    id={"todo-input"}
                />
                </Col>
                <Col lg={3} md={2} sm={2}>
                <Button primary id={'todo-add'} onClick={this.addToList}> Add </Button>
                </Col>
            </Row>
        );
    }
    render() {
        return(
            <MuiThemeProvider>
                <div className={"todo-wrapper dash-component-wrapper"}>
                    <Grid>
                        <Row>
                        <h1>Task</h1>
                        </Row>
                        {/*<Row>*/}
                        {this.inputField()}
                        {/*</Row>*/}
                        <Row>
                        <TodoList items={this.state.todos} delete={this.removeFromList} check={this.handleTaskState}/>
                        </Row>
                    </Grid>
                </div>
            </MuiThemeProvider>
        )
    }
}