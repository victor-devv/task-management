import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProjectsList extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
        };
    }

    componentDidMount() {
        axios.get("/api/projects").then((response) => {
            this.setState({
                projects: response.data,
            });
        });
    }

    handleDeleteProject (projectId) {
        axios.delete(`/api/projects/${projectId}`).then(response => {
          this.setState(prevState => ({
            tasks: prevState.projects.filter(project => {
              return project.id !== projectsId
            })
          }))
        })
    }

    render() {
        const { projects } = this.state;
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">All projects</div>
                            <div className="card-body">
                                <Link
                                    className="btn btn-primary btn-sm mb-3"
                                    to="/create"
                                >
                                    Create new project
                                </Link>
                                <ul className="list-group list-group-flush">
                                    {projects.map((project) => (
                                        <Link
                                            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                            to={`/${project.id}`}
                                            key={project.id}
                                        >
                                            {project.name}
                                            <span className="badge badge-primary badge-pill mx-auto">
                                                {project.tasks_count}
                                            </span>
                                            <button className='btn btn-danger btn-sm float-right' onClick={this.handleDeleteProject.bind(this,project.id)}
                                            >
                                            Delete
                                            </button>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ProjectsList