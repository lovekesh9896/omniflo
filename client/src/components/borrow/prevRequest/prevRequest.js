import "./prevRequest.css";

function PrevBorrowRequest({ reqArr }) {
	return (
		<>
			<div className="prev-borrow">
				<h2>Your Prev Borrow Request</h2>

				<table>
					<thead>
						<tr>
							<th>Request Number</th>
							<th>Request Amount</th>
							<th>Request Reason</th>
							<th>Request Duration</th>
							<th>Request Status</th>
						</tr>
					</thead>
					<tbody>
						{reqArr.map((item, index) => {
							return (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{item.amount}</td>
									<td>{item.reason}</td>
									<td>{item.duration}</td>
									<td>Pending</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default PrevBorrowRequest;
