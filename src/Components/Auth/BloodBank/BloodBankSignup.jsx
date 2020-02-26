import React, { Component } from "react";
import { signup } from "./index";
//import ParticleContainer from '/home/arnab099/Codes/FalsePromise/src/Components/Home/ParticleContainer';
//add email name pass validation

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      blood: "",
      phone: null,
      email: "",
      password: "",
      error: "",
      open: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();
    const { name, blood, phone, email, password } = this.state;
    const user = {
      name,
      blood,
      phone,
      email,
      password
    };
    signup(user).then(data => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          name: "",
          blood: "",
          phone: null,
          email: "",
          password: "",
          error: "",
          open: true
        });
    });
  };

  signupForm = (name, blood, phone, email, password) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={this.handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Blood Group</label>
          <input
            onChange={this.handleChange("blood")}
            type="text"
            className="form-control"
            value={blood}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">phone</label>
          <input
            onChange={this.handleChange("phone")}
            type="number"
            className="form-control"
            value={phone}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={this.handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={this.handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
        <button
          onClick={this.clickSubmit}
          className="btn btn-raised btn-primary"
        >
          Sign up
        </button>
      </form>
    );
  };

  render() {
    const { name, blood, phone, email, password, error, open } = this.state;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>

        <div
          className="alert alert-primary"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {this.signupForm(name, blood, phone, email, password)}

        <div
          className="alert alert-info"
          style={{ display: open ? "" : "none" }}
        >
          New Account is Created!!....Please Sign in
        </div>
      </div>
    );
  }
}

export default Signup;
