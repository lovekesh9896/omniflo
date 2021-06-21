import "./App.css";
import Header from "./components/header/header";
import Landing from "./components/landing/landing";
import BorrowScreen from "./components/borrow/borrow";
import { useState } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

function App() {
	let [user, setUser] = useState({});

	return (
		<BrowserRouter>
			<div className="app">
				<Header user={user} />
				<Route
					exact
					path="/console"
					render={() => <BorrowScreen user={user} />}
				/>
				<Route
					exact
					path="/"
					render={() => <Landing setUser={setUser} />}
				/>
				<Redirect to="/" />
			</div>
		</BrowserRouter>
	);
}

export default App;
