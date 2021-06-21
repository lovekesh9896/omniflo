import "./App.css";
import Header from "./components/header/header";
import Landing from "./components/landing/landing";
import BorrowScreen from "./components/borrow/borrow";
import { useState } from "react";

function App() {
	let [user, setUser] = useState({});

	return (
		<div className="app">
			<Header user={user} />
			{typeof user.name === "undefined" ? (
				<Landing setUser={setUser} />
			) : (
				<BorrowScreen user={user} />
			)}
		</div>
	);
}

export default App;
