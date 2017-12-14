import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Button from "../UI/Button";
import axios from 'axios';
import Dialog from '../Utils/Dialog';
import { Spinner } from '../UI/Spinner';
import Decoder from 'jwt-decode';
import '../styles/login.css';
// import Logo from '../UI/Logo';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {
                Email: "",
                Password: ""
            },
            emailError: null,
            pwdError: null,
            isLoading: false,
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            account: {
                ...this.state.account,
                [name]: value
            }
        })
    }

    validation = () => {
        const { Email, Password } = this.state.account;

        const check = /.*\S.*/;
        check.test(Email) === false ? this.setState({ emailError: (<p>Email cannot be empty</p>) }) : this.setState({ emailError: null });

        check.test(Password) === false ? this.setState({ pwdError: (<p>Password cannot be empty</p>) }) : this.setState({ pwdError: null });

        const valid = check.test(Email) && check.test(Password);
        if (valid) {
            this.login();
        }
    }

    login = () => {
        this.setState({ isLoading: true });
        axios.post(`/api/user/login`, this.state.account)
            .then(response => {
                this.setState({ isLoading: false });
                const decode = Decoder(response.data.token);
                window.sessionStorage.token = response.data.token;
                window.sessionStorage.name = decode.name;
                window.sessionStorage.exp = decode.exp;
                this.props.history.push('/#');
                // return (<Dialog content={"You are logged in!"}/>);
                Dialog(true, "You are logged in!");
            })
            .catch(error => {
                this.setState({ isLoading: false });
                // this.displayDialog(error.response.statusText);
                Dialog(false, error);
                // return (<Dialog error content={error.response.statusText}/>);
            });
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.validation();
        }
    }

    render() {
        const { emailError, pwdError, isLoading } = this.state;
        if (isLoading)
            return <Spinner />;
        return (
            <div className={"login-div"}>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <div className={"text-center"}>
                        <h3>McDowall Management</h3>
                        <br />
                        <img src={require('../img/school-logo.png')} height="150px" width="150px" alt="logo" />
                        <TextField
                            hintText="john.doe@example.com"
                            floatingLabelText="Email"
                            fullWidth={true}
                            name={"Email"}
                            onChange={event => this.handleInputChange(event)}
                            errorText={emailError}
                        />
                        <TextField
                            hintText="Password"
                            floatingLabelText="Password"
                            fullWidth={true}
                            name={"Password"}
                            type={"password"}
                            onChange={event => this.handleInputChange(event)}
                            onKeyPress={this._handleKeyPress}
                            errorText={pwdError}
                        />
                        <br />
                        <Button onClick={this.validation}>
                            Log in <i className="fa fa-fw fa-chevron-right" />
                        </Button>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }

}