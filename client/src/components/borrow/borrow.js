import "./borrow.css";
import illustration from "./borrow.png";
import apis from "../../API/API";
import { useState, useEffect } from "react";
import PrevBorrowRequest from "./prevRequest/prevRequest";

function BorrowScreen({ user }) {
	let [createRequest, setCreateRequest] = useState(false);
	let [currBorrowRequest, setCurrBorrowRequest] = useState(null);

	useEffect(() => {
		const getUserDetails = async () => {
			let userdetails = await apis.getUser({ name: user.name });
			console.log(userdetails);
			if (userdetails.data.success) {
				setCurrBorrowRequest(userdetails.data.data.borrowRequest);
			}
		};

		getUserDetails();
	}, [user.name]);

	function handleBorrowRequest(e) {
		e.preventDefault();

		let obj = {
			amount: document.getElementById("amount").value,
			reason: document.getElementById("reason").value,
			duration: document.getElementById("duration").value,
			name: user.name,
		};

		console.log(obj);

		apis.borrowRequest(obj)
			.then((res) => {
				console.log(res);
				document.getElementById("request-btn").disabled = true;
				document.getElementById("request-btn").innerText =
					"Request Added Successfully";
				setCurrBorrowRequest([...currBorrowRequest, obj]);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<>
			<div className="borrow">
				<div className="borrow-right">
					<h3>Create Borrow Request</h3>
					{createRequest === true ? (
						<form
							type="POST"
							action=""
							onSubmit={handleBorrowRequest}
						>
							<input
								type="text"
								placeholder="Enter Amount You want to borrow"
								id="amount"
							/>
							<input
								type="text"
								placeholder="Reason For Borrowing"
								id="reason"
							/>
							<input
								type="text"
								placeholder="Enter Expected return duration"
								id="duration"
							/>
							<button id="request-btn" type="submit">
								Request Money
							</button>
						</form>
					) : (
						<>
							<h4>But Remember</h4>
							<ul>
								<li>
									Be Respectfull! You are the one needing
									money
								</li>
								<li>You have to write a explanation note.</li>
								<li>
									These notes will be the things that we want
								</li>
								<li>
									user to read before creating any request.
								</li>
								<li>
									So that he/she will create better request
								</li>
								<li>
									and his chances for request acceptance will
									increase
								</li>
							</ul>
							<button onClick={() => setCreateRequest(true)}>
								Request Money
							</button>
						</>
					)}
				</div>
				<div className="borrow-left">
					<img src={illustration} alt="" />
				</div>
			</div>
			{currBorrowRequest && (
				<PrevBorrowRequest reqArr={currBorrowRequest} />
			)}
		</>
	);
}

export default BorrowScreen;
