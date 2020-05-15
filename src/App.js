import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Controls from "./components/Controls";
import TaskList from "./components/TaskList";
import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: { name: "", status: -1 },
      keyword: "",
      sortBy: "name",
      sortValue: 1,
    };
  }

  // Keep tasks when reload page
  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({ tasks: tasks });
    }
  }

  // Generate sample tasks
  handleGenerateData = () => {
    var tasks = [
      { id: this.generateID(), name: "sampleA", status: true },
      { id: this.generateID(), name: "sampleB", status: false },
      { id: this.generateID(), name: "sampleC", status: true },
    ];
    this.setState({
      tasks: tasks,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Toggle form add tasks
  handleToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null,
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null,
      });
    }
  };

  // Close form add tasks
  handleCloseForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };

  // Show form add tasks
  handleShowForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };

  // add task when submit
  handleSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id === "") {
      // Create a new unique ID
      data.id = this.generateID();
      tasks.push(data);
    } else {
      //Editing
      var index = this.findIndex(data.id);
      tasks[index] = data;
      this.handleCloseForm();
    }
    this.setState({
      tasks: tasks,
      taskEditing: null,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Change tasks status
  handleUpateStatus = (id) => {
    var { tasks } = this.state;
    // var index = this.findIndex(id);
    var index = _.findIndex(tasks, (task) => {
      //lodash
      return task.id === id;
    });

    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  // Find index of tasks that need to be change it status
  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };

  //Delete tasks
  handleDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    this.handleCloseForm();
  };

  // Update tasks
  handleUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({ taskEditing: taskEditing });
    this.handleShowForm();
  };

  handleFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    });
  };

  handleSearch = (keyword) => {
    this.setState({ keyword: keyword });
  };

  handleSort = (sortBy, sortValue) => {
    this.setState({ sortBy: sortBy, sortValue: sortValue });
  };

  // Create a random string
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  // Generate an unique ID from random strings
  generateID() {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4()
    );
  }

  render() {
    var {
      tasks,
      isDisplayForm,
      taskEditing,
      filter,
      keyword,
      sortBy,
      sortValue,
    } = this.state; // var tasks = this.state.tasks

    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 0 ? true : false);
        }
      });
    }

    if (keyword) {
      // tasks = tasks.filter((task) => {
      //   return task.name.toLowerCase().indexOf(keyword) !== -1;
      // });
      tasks = _.filter(tasks, (task) => {
        //lodash
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }

    if (sortBy === "name") {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sortValue;
        else if (a.name < b.name) return -sortValue;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return sortValue;
        else if (a.status < b.status) return -sortValue;
        else return 0;
      });
    }

    var elementTaskForm = isDisplayForm ? (
      <TaskForm
        onSubmit={this.handleSubmit}
        onCloseForm={this.handleCloseForm}
        onShowForm={this.handleShowForm}
        task={taskEditing}
      />
    ) : (
      ""
    );
    return (
      <div className="container">
        <div className="text-center">
          <h1>
            <strong>TODO MANAGEMENT</strong>
          </h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isDisplayForm === true
                ? "col-xs-4 col-sm-4 col-md-4 col-lg-4"
                : ""
            }
          >
            {/* Form */}
            {elementTaskForm}
          </div>
          <div
            className={
              isDisplayForm === true
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleToggleForm}
            >
              <span className="fa fa-plus mr-5"></span>Add TODO
            </button>
            <button
              type="button"
              className="btn btn-danger ml-5"
              onClick={this.handleGenerateData}
            >
              Generate Sample Data
            </button>
            {/* Controls */}
            <Controls
              onSearch={this.handleSearch}
              onSort={this.handleSort}
              sortBy={sortBy}
              sortValue={sortValue}
            />
            {/* List */}
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.handleUpateStatus}
                  onDelete={this.handleDelete}
                  onUpdate={this.handleUpdate}
                  onFilter={this.handleFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
