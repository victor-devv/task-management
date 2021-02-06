import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactDOMServer from "react-dom/server";

import Header from "./components/Header";
import NewProject from "./components/NewProject";
import ProjectsList from "./components/ProjectsList";
import Project from "./components/Project";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={ProjectsList} />
                        <Route path="/create" component={NewProject} />
                        <Route path="/:id" component={Project} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

let {} = context;

const html = ReactDOMServer.renderToString(<App />);

dispatch(html);
