import React from 'react';
import Button from "../UI/Button";
import Checkbox from 'material-ui/Checkbox';
import {Table} from 'react-bootstrap';
import '../styles/todolist.css';

function Todo(props) {
    const item = props.item;
    return (
        <tr>
            <td style={{maxWidth:"15%"}}>
                <Checkbox
                    checked={props.item.done}
                    onCheck={()=>props.check(props.item.id)}
                />
            </td>
            <td style={{maxWidth:"70%"}}>
                {item.text}
            </td>
            <td style={{maxWidth:"15%"}}>
                <Button danger onClick={()=>props.delete(props.item.id)}><i className="fa fa-trash" aria-hidden="true"/></Button>
            </td>
        </tr>
    )
}

export default function TodoList(props) {
    return (
        <Table>
            <thead>
            <tr>
                <th>done</th>
                <th>Task</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {
                props.items.map(
                    (item) => <Todo key={`${item.id}`} item={item} check={props.check} delete={props.delete}/>)
            }
            </tbody>
        </Table>
    )
}