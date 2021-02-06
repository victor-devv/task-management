import React, { Component } from "react";
import Header from "./Header";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {},
        };
    }
    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({
                isLoggedIn: AppState.isLoggedIn,
                user: AppState.user,
            });
        }
    }
    render() {
        return (
            <div className="container">
                <h1 className="display-2 text-center m-5">
                    Task Management System
                </h1>
                <p className="text-center">Implementation By Victor Ikuomola</p>
            </div>
        );
    }
}
export default Home;
