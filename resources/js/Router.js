import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import NotFound from "./views/NotFound/NotFound";
// User is LoggedIn
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./views/user/Dashboard/Dashboard";
import Header from "./components/Header";
import NewProject from "./components/NewProject";
import ProjectsList from "./components/ProjectsList";
import Project from "./components/Project";

const Main = (props) => (
    <Switch>
        {/*User might LogIn*/}
        <Route exact path="/" component={Home} />
        {/*User will LogIn*/}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* User is LoggedIn*/}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/projectlist" component={ProjectsList} />
        <PrivateRoute path="/create" component={NewProject} />
        <PrivateRoute path="/:id" component={Project} />
        {/*Page Not Found*/}
        {/* <Route component={NotFound} /> */}
    </Switch>
);
export default Main;
