import React, { Component } from "react";
//import ParticleContainer from '/home/arnab099/Codes/FalsePromise/src/Components/Home/ParticleContainer';
//add email name pass validation

class Donor extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			password: "",
			mobile: "",
			address: "",
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
		const { name, email, password, mobile, address } = this.state;
		const user = {
			name,
			email,
			password,
			mobile,
			address
		};
		this.donor(user).then(data => {
			if (data.error) this.setState({ error: data.error });
			else
				this.setState({
					name: "",
					email: "",
					password: "",
					mobile: "",
					address: "",
					error: "",
					open: true
				});
		});
	};

	donor = user => {
		return fetch("http://localhost:5000/signup", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-type": "application/json"
			},
			body: JSON.stringify(user)
		})
			.then(response => {
				return response.json();
			})
			.catch(err => {
				console.log(err);
			});
	};

	donorForm = (name, email, password, mobile, address) => {
		return (
			<form>
				<h2>
					<br />
					<div className="form-group">
						Name
						<input
							onChange={this.handleChange("name")}
							type="text"
							value={name}
						/>
						Blood Group
						<select name="BG">
							<option id="b0" value="0th" selected>
								select
							</option>
							<option id="b1" value="1st">
								A+
							</option>
							<option id="b2" value="2nd">
								A-
							</option>
							<option id="b1" value="1st">
								B+
							</option>
							<option id="b1" value="1st">
								B-
							</option>
							<option id="b1" value="1st">
								O+
							</option>
							<option id="b1" value="1st">
								O-
							</option>
							<option id="b1" value="1st">
								AB+
							</option>
							<option id="b1" value="1st">
								AB-
							</option>
						</select>
					</div>
					<div className="form-group">
						Email
						<input
							onChange={this.handleChange("email")}
							type="email"
							value={email}
						/>
						Password
						<input
							onChange={this.handleChange("password")}
							type="password"
							value={password}
						/>
					</div>
					<div className="form-group">
						Address
						<input
							onChange={this.handleChange("address")}
							type="text"
							value={address}
						/>
						Medically fit
						<select name="fit">
							<option id="f0" value="0th" selected>
								select
							</option>
							<option id="f1" value="1st">
								Yes
							</option>
							<option id="f2" value="2nd">
								No
							</option>
						</select>
					</div>
					<div className="form-group">
						Mobile
						<input
							onChange={this.handleChange("mobile")}
							type="text"
							value={mobile}
						/>
					</div>
					<button onClick={this.clickSubmit}>Sign up</button>
					<br />
					<form action="Signin">
						<h1>
							Already have an account?
							<button>Login</button>
						</h1>
					</form>
				</h2>
				<h2></h2>
			</form>
		);
	};

	render() {
		const { name, email, password, mobile, adress, error, open } = this.state;

		return (
			<div className="container">
				{/* <ParticleContainer /> */}
				<h3 className="mt-5 mb-5">Become A Donar</h3>
				<h3 className="mt-5 mb-5">Register Now</h3>
				<div
					className="alert alert-primary"
					style={{ display: error ? "" : "none" }}
				>
					{error}
				</div>

				{this.donorForm(name, email, password, mobile, adress)}

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

export default Donor;
