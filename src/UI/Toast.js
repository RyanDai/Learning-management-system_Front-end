import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min';
import '../styles/toast.css';

export default class Toast extends Component {

    notify = () => toast(this.props.Msg, {
        className: 'dark-toast',
        onClose: this.props.onKill
    });

    componentDidMount() {
        this.notify();
    }

    render() {
        return (
            <div id={"toast-wrap"}>
                <ToastContainer
                    position="bottom-right"
                    type="success"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                    className={"text-center toaster"}
                />
            </div>
        );
    }
}

export class ErrorToast extends Component {

    notify = () => toast(this.props.Msg, {
        className: 'error-toast',
        onClose: this.props.onKill
    });

    componentDidMount() {
        this.notify();
    }

    render() {
        return (
            <div id={"toast-wrap"}>
                <ToastContainer
                    position="bottom-right"
                    type="success"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                    className={"text-center toaster"}
                />
            </div>
        );
    }
}
