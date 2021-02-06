import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Router";
import Header from "./components/Header";
class App extends Component {
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
            <BrowserRouter>
                <Header
                    userData={this.state.user}
                    userIsLoggedIn={this.state.isLoggedIn}
                />
                <div className="container">
                    <Route component={Main} />
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
