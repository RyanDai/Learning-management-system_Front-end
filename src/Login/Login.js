import React, { Component } from 'react';
import Highlight from "../UI/Highlight";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Button from "../UI/Button";
import axios from 'axios';
import swal from 'sweetalert2';
import { Spinner } from '../UI/Spinner';
import Decoder from 'jwt-decode';
import Nav from '../App/TopNav';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account:{
                Email:"",
                Password:""
            },
            emailError:null,
            pwdError:null,
            isLoading:false,
        }
    }

    handleInputChange=(event) => {
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

    displayDialog=(error) =>{
        return (
        swal({
            type: 'error',
            title: error,
            showConfirmButton: true,
            timer: 5000
        })
        )
    }

    validation=()=>{
        const {Email, Password} = this.state.account;

        const check = /.*\S.*/;
        check.test(Email) === false ? this.setState({ emailError: (<p>Email cannot be empty</p>) }):this.setState({ emailError: null });

        check.test(Password) === false ? this.setState({ pwdError: (<p>Password cannot be empty</p>) }):this.setState({ pwdError: null });

        const valid = check.test(Email)&&check.test(Password);
        if(valid) {
            this.login();
        }
    }

    login=()=>{
        this.setState({ isLoading: true });
        axios.post(`/api/user/login`, this.state.account)
            .then(response => {
                this.setState({ isLoading: false });
                swal({
                    type: 'success',
                    title: 'Your are logged in!',
                    showConfirmButton: false,
                    timer: 5000
                });
                const decode = Decoder(response.data.token);
                window.sessionStorage.token = response.data.token;
                window.sessionStorage.name = decode.name;
                window.sessionStorage.exp = decode.exp;
                this.props.history.push('/#');
            })
            .catch(error => {
                this.setState({ isLoading: false });
                this.displayDialog(error.response.statusText);
            });
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.validation();
        }
    }

    render(){
        const {emailError, pwdError, isLoading} = this.state;
        if (isLoading)
            return <Spinner />;
        return(
            <Highlight className={"register-div"}>
                <MuiThemeProvider>
                    <div className={"text-center"}>
                        <h3>Log in</h3>
                        <TextField
                            hintText="john.doe@example.com"
                            floatingLabelText="Email"
                            fullWidth={true}
                            name={"Email"}
                            onChange={ event=>this.handleInputChange(event) }
                            errorText={emailError}
                        />
                        <TextField
                            hintText="Password"
                            floatingLabelText="Password"
                            fullWidth={true}
                            name={"Password"}
                            type={"password"}
                            onChange={ event=>this.handleInputChange(event) }
                            onKeyPress={this._handleKeyPress}
                            errorText={pwdError}
                        />
                        <br/>
                        <Button primary onClick={this.validation}>
                            Log in
                        </Button>
                    </div>
                </MuiThemeProvider>
            </Highlight>
        )
    }

}