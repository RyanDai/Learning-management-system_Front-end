import React from 'react';
import Button from './Button';
import '../styles/Modal.css';


export default class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            show:"block"
        }
    }

    closeDialog=()=> {
        this.setState({show:"none"})
    }

    render() {
        return (
            <div class="modal" tabindex="-1" role="dialog" id="dialog" style={{display:`${this.state.show}`}}>
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{this.props.title}</h5>
                        </div>
                        <div class="modal-body">
                            <p>{this.props.body}</p>
                        </div>
                        <div class="modal-footer">
                            <Button primary onClick={this.props.btnClick}>Close</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}