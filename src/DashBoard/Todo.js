import React, { Component } from 'react';
import Button from "../UI/Button";
import TodoList from "./TodoList";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';
import Request from '../Utils/Request';

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input:"",
            nextId:0,
            todos:[
            ]

        }
    }

    componentWillMount(){
        Request("GET", "/api/dash/task")
            .then(response=>{
                const data = response.data;
                this.loadTasks(data);
            })
            .catch(error=>{
                console.log(error);
            });
    }

    loadTasks=(data)=>{
        let count = 1;
        if(data.length > 0){
            count = data[data.length-1].ID;
        }
        console.log(count);
        this.setState({todos:data, nextId:count});
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
        Request("POST", "/api/dash/task", newItem)
            .then(response=>{
                const data = response.data;
                this.loadTasks(data);
            })
            .catch(error=>{
                console.log(error);
            });
    }

    removeFromList=(id)=>{
        let items = this.state.todos;
        for(let i = 0; i < items.length; i++) {
            let item = items[i];

            if(item.ID === id){
                items.splice(i,1);
                break;
            }
        }
        this.setState({todos:items});
        Request("DELETE", `/api/dash/task/${id}`)
            .then(r=>{
                console.log(r);
            })
            .catch(e=>{
                console.log(e);
            })
    }

    handleTaskState=(id)=>{
        let items = this.state.todos;
        let updateItem = null;
        for(let i = 0; i < items.length; i++) {
            let item = items[i];

            if(item.ID === id){
                item.Done = !item.Done;
                updateItem = item;
                break;
            }
        }
        this.setState({todos:items});
        Request("PUT", "/api/dash/task", updateItem)
            .then(r=>{
                console.log(r);
            })
            .catch(e=>{
                console.log(e);
            })
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