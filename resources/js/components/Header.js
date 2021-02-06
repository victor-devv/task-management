import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";
class Header extends Component {
    // 1.1
    constructor(props) {
        super(props);
        this.state = {
            user: props.userData,
            isLoggedIn: props.userIsLoggedIn,
        };
        this.logOut = this.logOut.bind(this);
    }
    // 1.2
    logOut() {
        let appState = {
            isLoggedIn: false,
            user: {},
        };
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
        this.props.history.push("/login");
    }
    // 1.3
    render() {
        const aStyle = {
            cursor: "pointer",
        };

        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark navbar-laravel">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Task Manager
                    </Link>
                    <ul className="navbar-nav">
                        {this.state.isLoggedIn ? (
                            <li className="has-sub nav-item">
                                <span></span>
                                <Link to="/projectlist" className="ml-2">
                                    
                                    Projects
                                
                                </Link>
                            </li>
                        ) : (
                            ""
                        )}
                        {!this.state.isLoggedIn ? (
                            <li className="nav-item float-right">
                                <Link to="/login">Login</Link> |{" "}
                                <Link to="/register">Register</Link>
                            </li>
                        ) : (
                            ""
                        )}
                    </ul>
                </div>
            </nav>
        );
    }
}
export default withRouter(Header);
