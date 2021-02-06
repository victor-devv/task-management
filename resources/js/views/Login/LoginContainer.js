import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import FlashMessage from "react-flash-message";
class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            error: "",
            formSubmitting: false,
            user: {
                email: "",
                password: "",
            },
            redirect: props.redirect,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }
    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState });
        }
    }
    componentDidMount() {
        const { prevLocation } = this.state.redirect.state || {
            prevLocation: { pathname: "/projectlist" },
        };
        if (prevLocation && this.state.isLoggedIn) {
            return this.props.history.push(prevLocation);
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ formSubmitting: true });
        let userData = this.state.user;
        axios
            .post("/api/auth/login", userData)
            .then((response) => {
                return response;
            })
            .then((json) => {
                if (json.data.success) {
                    let userData = {
                        id: json.data.id,
                        name: json.data.name,
                        email: json.data.email,
                    };
                    let appState = {
                        isLoggedIn: true,
                        user: userData,
                    };
                    localStorage["appState"] = JSON.stringify(appState);
                    this.setState({
                        isLoggedIn: appState.isLoggedIn,
                        user: appState.user,
                        error: "",
                    });
                    location.reload();
                } else {
                    alert(`Our System Failed To Register Your Account!`);
                }
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code that falls out of the range of 2xx
                    let err = error.response.data;
                    this.setState({
                        error: err.message,
                        errorMessage: err.errors,
                        formSubmitting: false,
                    });
                } else if (error.request) {
                    // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                    let err = error.request;
                    this.setState({
                        error: err,
                        formSubmitting: false,
                    });
                } else {
                    // Something happened in setting up the request that triggered an Error
                    let err = error.message;
                    this.setState({
                        error: err,
                        formSubmitting: false,
                    });
                }
            })
            .finally(this.setState({ error: "" }));
    }
    handleEmail(e) {
        let value = e.target.value;
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                email: value,
            },
        }));
    }
    handlePassword(e) {
        let value = e.target.value;
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                password: value,
            },
        }));
    }
    render() {
        const { state = {} } = this.state.redirect;
        const { error } = state;
        return (
            <div className="container m-5">
                <div className="row">
                    <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
                        <h2 className="text-center mb30">
                            Log In To Your Account
                        </h2>
                        {this.state.isLoggedIn ? (
                            <FlashMessage
                                duration={60000}
                                persistOnHover={true}
                            >
                                <h5 className={"alert alert-success"}>
                                    Login successful, redirecting...
                                </h5>
                            </FlashMessage>
                        ) : (
                            ""
                        )}
                        {this.state.error ? (
                            <FlashMessage
                                duration={100000}
                                persistOnHover={true}
                            >
                                <h5 className={"alert alert-danger"}>
                                    Error: {this.state.error}
                                </h5>
                            </FlashMessage>
                        ) : (
                            ""
                        )}
                        {error && !this.state.isLoggedIn ? (
                            <FlashMessage
                                duration={100000}
                                persistOnHover={true}
                            >
                                <h5 className={"alert alert-danger"}>
                                    Error: {error}
                                </h5>
                            </FlashMessage>
                        ) : (
                            ""
                        )}
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="E-mail"
                                    className="form-control"
                                    required
                                    onChange={this.handleEmail}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    required
                                    onChange={this.handlePassword}
                                />
                            </div>
                            <button
                                disabled={this.state.formSubmitting}
                                type="submit"
                                name="singlebutton"
                                className="btn btn-primary btn-lg btn-block mb10"
                            >
                                {" "}
                                {this.state.formSubmitting
                                    ? "Logging You In..."
                                    : "Log In"}{" "}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(LoginContainer);
