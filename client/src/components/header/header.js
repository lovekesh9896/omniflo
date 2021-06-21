import "./header.css";

function Header({ user }) {
	return (
		<div className="header">
			<div className="header-left">
				<div className="logo-container">Omniflo</div>
			</div>
			<div className="header-right">
				<nav>
					<ul>
						<li className="underline">
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/">Services</a>
						</li>
						<li>
							<a href="/">About Us</a>
						</li>
						<li>
							<a href="/">Contact</a>
						</li>
						<li className="header-highlight">
							<a href="/">
								{typeof user.name !== "undefined"
									? user.name
									: "Get Started"}{" "}
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}

export default Header;
