import "./landing.css";
import apis from "../../API/API";
import { useState } from "react";

function Landing({ setUser }) {
	let [signUpForm, setSignupForm] = useState(true);

	function userSignUpHandler(event) {
		event.preventDefault();

		let cred = {
			name: document.getElementById("user-name").value,
			gender: document.getElementById("user-gender").value,
			mobileNumber: document.getElementById("user-mobileNumber").value,
		};

		apis.createUser(cred)
			.then((res) => {
				console.log(res);
				setUser(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function userSignInHandler(event) {
		event.preventDefault();

		let cred = {
			mobileNumber: document.getElementById("user-mobileNumber").value,
		};

		apis.authUser(cred)
			.then((res) => {
				console.log(res);
				setUser(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function handleFormChange() {
		setSignupForm((prevState) => {
			return !prevState;
		});
	}

	return (
		<div className="landing">
			<div className="landing-left">
				<h1>
					This will be the main heading of the website Which defines
					our service. It's short.
				</h1>

				<h3>
					This will be the second heading of the website. This is
					usually long and describes what our service is about. So I
					am just adding modern Lorem Ipsum here for context.
				</h3>

				<button>Get Started for free</button>
			</div>
			<div className="landing-right">
				{signUpForm === true ? (
					<>
						<h2>Sign-up form</h2>
						<form
							type="POST"
							action=""
							onSubmit={userSignUpHandler}
							className="sign-in-form"
						>
							<input
								type="text"
								placeholder="Enter You Name"
								id="user-name"
								name="name"
								required
							/>
							<input
								type="text"
								placeholder="Your Gender"
								id="user-gender"
								name="gender"
								required
							/>
							<input
								type="text"
								placeholder="Enter You Phone Number"
								id="user-mobileNumber"
								name="mobileNumber"
								required
							/>
							<button type="submit">Sign Up</button>
						</form>
						<div>
							Already have a account ?
							<button
								onClick={handleFormChange}
								className="change-login"
							>
								Sign-In
							</button>{" "}
							instead
						</div>
					</>
				) : (
					<>
						<h2>Sign In Form</h2>
						<form
							type="POST"
							action=""
							onSubmit={userSignInHandler}
							className="sign-in-form"
						>
							<input
								type="text"
								placeholder="Enter You Number"
								id="user-mobileNumber"
								name="mobileNumber"
								required
							/>
							<input
								type="text"
								placeholder="Enter Any OTP"
								name="OTP"
								required
							/>
							<button type="submit">Sign In</button>
						</form>
						<div>
							Don't have an account ?
							<button
								onClick={handleFormChange}
								className="change-login"
							>
								Sign-Up
							</button>{" "}
							instead
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Landing;
