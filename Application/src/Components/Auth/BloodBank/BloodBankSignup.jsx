import React, { Component } from "react";
import { signup } from "./index";
import classes from './BloodBank.module.css';
import Particles from '../../Home/ParticleContainer'
//add email name pass validation

class BloodBankSignup extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			phone: "",
			address: "",
			bloodTypes: {'A+':0,'A-':0,'B+':0,'B-':0,'O+':0,'O-':0,'AB+':0,'AB-':0},
			latitude: 12,
			longitude: 21,
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
		let {
			name,
			phone,
			address,
			bloodTypes,
			latitude,
			longitude,
			email,
			password
		} = this.state;

		let user = {
			name,
			phone,
			address,
			bloodTypes,
			latitude,
			longitude,
			email,
			password
		};
		bloodTypes['A+'] = document.getElementById('a+').value;
		bloodTypes['A-'] = document.getElementById('a-').value;
		bloodTypes['B+'] = document.getElementById('b+').value;
		bloodTypes['B-'] = document.getElementById('b-').value;
		bloodTypes['O+'] = document.getElementById('o+').value;
		bloodTypes['O-'] = document.getElementById('o-').value;
		bloodTypes['AB+'] = document.getElementById('ab+').value;
		bloodTypes['AB-'] = document.getElementById('ab-').value;
		signup(user).then(data => {
			if (data.error) this.setState({ error: data.error });
			else
				this.setState({
					name: "",
					phone: "",
					address: "",
					bloodTypes: {'A+':0,'A-':0,'B+':0,'B-':0,'O+':0,'O-':0,'AB+':0,'AB-':0},
					email: "",
					password: "",
					error: "",
					open: true
				});
		});
	};

	signupForm = (name, phone, address, bloodTypes, email, password) => {
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
					<label className="text-muted">phone</label>
					<input
						onChange={this.handleChange("phone")}
						type="number"
						className="form-control"
						value={phone}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">address</label>
					<input
						onChange={this.handleChange("address")}
						type="text"
						className="form-control"
						value={address}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Blood Group and Quantity</label><br/>
					A+<input type='number' id="a+" /><br/><br/>
					A-<input type='number' id="a-"/><br/><br/>
					B+<input type='number' id="b+"/><br/><br/>
					B-<input type='number' id="b-"/><br/><br/>
					O+<input type='number' id="o+"/><br/><br/>
					O-<input type='number' id="o-"/><br/><br/>
					AB+<input type='number' id="ab+"/><br/><br/>
					AB-<input type='number' id="ab-"/><br/><br/>
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
		const { name, phone, address, bloodTypes, email, password, error, open } = this.state;
		document.body.className = classes.bcg;
		return (
			<div className="container">
				<Particles />
				<h2 className="mt-5 mb-5">Blood Bank Signup</h2>

				<div
					className="alert alert-primary"
					style={{ display: error ? "" : "none" }}
				>
					{error}
				</div>

				{this.signupForm(name, phone, address, bloodTypes, email, password)}

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

export default BloodBankSignup;
