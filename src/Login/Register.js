import React, { Component } from 'react';
import Highlight from "../UI/Highlight";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Button from "../UI/Button";
import axios from 'axios';
import Modal from "../Utils/Modal";
import ErrorMsg from '../Utils/ErrorMsg';
import swal from 'sweetalert2';
import { Spinner } from '../UI/Spinner';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {
                Email: "",
                Phone: "",
                Password: "",
                Name: ""
            },
            emailError: null,
            phoneError: null,
            pwdError: null,
            nameError: null,
            isLoading: false,
            showError: false,
            error: "",
            verification: false,
            verificationMsg: null,
            code: ""
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

    displayDialog = (error) => {
        this.setState({ showError: true, error: error });
    }

    hideDialog = () => {
        this.setState({ showError: false });
    }

    validation = () => {
        const { Email, Phone, Password, Name } = this.state.account;

        const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        email.test(Email) === false ? this.setState({ emailError: (<p>Email is required and format should be john@doe.com</p>) }) : this.setState({ emailError: null });

        const phone = /\+61\d{9,9}$/;
        phone.test(Phone) === false ? this.setState({ phoneError: (<p> Phone number is required and must start with +61</p>) }) : this.setState({ phoneError: null });

        const password = /^[a-zA-Z0-9_.-]{3,}$/;
        password.test(Password) === false ? this.setState({ pwdError: (<p> Password can only contains characters and numbers, minimum 3 characters</p>) }) : this.setState({ pwdError: null });

        const name = /^[a-zA-Z0-9_.-]{2,}$/;
        name.test(Name) === false ? this.setState({ nameError: (<p> Name must contains at least two characters</p>) }) : this.setState({ nameError: null });

        const valid = email.test(Email) && phone.test(Phone) && password.test(Password) && name.test(Name);
        if (valid) {
            this.createAccount();
        }
    }

    createAccount = () => {

        this.setState({ isLoading: true });
        const { account } = this.state;

        axios.post('/api/user/register', account)
            .then(response => {
                this.setState({ isLoading: false, verification: true });
            })
            .catch(error => {
                this.setState({ isLoading: false });
                const errorMsg = <ErrorMsg error={error} />;
                this.displayDialog(errorMsg);
            });
    }

    renderRegister = () => {
        const { emailError, phoneError, pwdError, nameError } = this.state;
        return (
            <div>
                <h3>Register</h3>
                <TextField
                    hintText="john.doe@example.com"
                    floatingLabelText="Email"
                    fullWidth={true}
                    name={"Email"}
                    onChange={event => this.handleInputChange(event)}
                    errorText={emailError}
                />
                <TextField
                    hintText="Must start with +61"
                    defaultValue="+61"
                    floatingLabelText="Phone number"
                    fullWidth={true}
                    name={"Phone"}
                    onChange={event => this.handleInputChange(event)}
                    errorText={phoneError}
                />
                <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    fullWidth={true}
                    name={"Password"}
                    type={"password"}
                    onChange={event => this.handleInputChange(event)}
                    errorText={pwdError}
                />
                <TextField
                    hintText="How should we call you"
                    floatingLabelText="Display name"
                    fullWidth={true}
                    name={"Name"}
                    onChange={event => this.handleInputChange(event)}
                    errorText={nameError}
                />
                <br />
                <div className={"text-center"}>
                    <Button primary onClick={this.validation}>
                        Register
                    </Button>
                </div>
            </div>
        )
    }

    requestVerify = () => {
        axios.get(`/api/user/verification/${this.state.account.Email}`)
            .then(response => {
                this.setState({ verificationMsg: "We've just send a message with verification code to your mobile phone!" })
            })
            .catch(error => {
                this.setState({ isLoading: false });
                const errorMsg = <ErrorMsg error={error} />;
                this.displayDialog(errorMsg);
            });
    }

    sendCode = () => {
        axios.post(`/api/user/verification/${this.state.account.Email}/${this.state.code}`)
            .then(response => {
                swal({
                    type: 'success',
                    title: 'Your account has been created',
                    showConfirmButton: false,
                    timer: 2000
                }).then(
                    this.props.history.push('/#')
                    )
            })
            .catch(error => {
                this.setState({ isLoading: false });
                const errorMsg = <ErrorMsg error={error} />;
                this.displayDialog(errorMsg);
            });
    }
    renderVerification = () => {
        return (
            <div className={"text-center"}>
                <h3>Verification</h3>
                <Button primary onClick={this.requestVerify}>
                    Request verification code
                </Button>
                <p className={"text-center"}>{this.state.verificationMsg}</p>
                <TextField
                    hintText="6 digit code"
                    floatingLabelText="Verification code"
                    value={this.state.code}
                    onChange={event => this.setState({ code: event.target.value })}
                />
                <br />
                <Button primary onClick={this.sendCode}>
                    Verify
                </Button>
            </div>
        )
    }

    render() {
        const { isLoading, verification, showError, error } = this.state;
        if (isLoading)
            return <Spinner />;
        return (
            <Highlight className={"register-div"}>
                {showError && <Modal btnClick={this.hideDialog}>
                    <div>{error}</div>
                </Modal>}
                <MuiThemeProvider>
                    {verification === false ? this.renderRegister() : this.renderVerification()}
                </MuiThemeProvider>
            </Highlight>
        )
    }

}