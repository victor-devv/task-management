import React, { Component } from "react";
import Header from "../../../components/Header";
class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {},
        };
    }

    getStorage() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            return AppState;
            console.log(AppState);
            this.setState({
                isLoggedIn: AppState.isLoggedIn,
                user: AppState.user,
            });
            console.log(this.state);
        }
        return false;
    }
    // check if user is authenticated and storing authentication data as states if true
    componentWillMount() {
        if (this.getStorage()) {
            let res = this.getStorage();
            console.log(res);
            this.setState({
                isLoggedIn: res.isLoggedIn,
                user: res.user,
            });
        }
    }
    render() {
        return (
            <div>
                <Header
                    userData={this.state.user}
                    userIsLoggedIn={this.state.isLoggedIn}
                />
                <span>
                    Whatever normally goes into the user dasboard page; the
                    table below for instance
                </span>{" "}
                <br />
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th scope="row ">User Id</th>
                            <td>{this.user.id}</td>
                        </tr>
                        <tr>
                            <th scope="row ">Full Name</th>
                            <td>{this.user.name}</td>
                        </tr>
                        <tr>
                            <th scope="row ">Email</th>
                            <td>{this.user.email}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Dashboard;
