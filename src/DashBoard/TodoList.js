import React from 'react';
import Button from "../UI/Button";
import Checkbox from 'material-ui/Checkbox';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import {Table} from 'react-bootstrap';
import '../styles/todolist.css';

function Todo(props) {
    const item = props.item;
    return (
        <tr>
            <td style={{maxWidth:"15%"}}>
                <Checkbox
                    checked={props.item.Done}
                    onCheck={()=>props.check(props.item.ID)}
                />
            </td>
            <td style={{maxWidth:"70%"}}>
                {item.Text}
            </td>
            <td style={{maxWidth:"15%"}}>
                <Button danger onClick={()=>props.delete(props.item.ID)}><i className="fa fa-trash" aria-hidden="true"/></Button>
            </td>
        </tr>
    )
}


export default class TodoList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    renderTable(type){
        return(
            <Table>
                <thead>
                <tr>
                    <th style={{width:"15%", maxWidth:"15%"}} className={"text-center"}>done</th>
                    <th style={{width:"70%", maxWidth:"70%"}} className={"text-center"}>Task</th>
                    <th style={{width:"15%", maxWidth:"15%"}} className={"text-center"}>Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    type===2?this.props.items.map(
                        (item) => <Todo key={`${item.ID}`} item={item} check={this.props.check} delete={this.props.delete}/>)
                        :
                        type===1?this.props.items.filter(
                            item => item.Done === true
                        ).map(
                            (item) => <Todo key={`${item.ID}`} item={item} check={this.props.check} delete={this.props.delete}/>)
                            : this.props.items.filter(
                            item => item.Done === false
                            ).map(
                            (item) => <Todo key={`${item.ID}`} item={item} check={this.props.check} delete={this.props.delete}/>)
                }
                </tbody>
            </Table>
        )
    }
    render() {
        return (
            <div style={{overflow:"auto"}}>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab label="ALL" value={0} />
                    <Tab label="TODO" value={1} />
                    <Tab label="DONE" value={2} />
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div>
                        {this.renderTable(2)}
                    </div>
                    <div>
                        {this.renderTable(0)}
                    </div>
                    <div>
                        {this.renderTable(1)}
                    </div>
                </SwipeableViews>
            </div>
        );
    }
}