import React, { Component } from "react";
import styles from "./App.module.scss";
import Header from "./containers/Header/Header";
import Body from "./containers/Body/Body";
import Sidebar from "./containers/Sidebar/Sidebar";

class App extends Component {
	state = {
		displaySideBar: false,
	};

	displaySidebar = () => {
		this.setState({ displaySideBar: !this.state.displaySideBar });
	};
	render() {
		return (
			<div className={styles.app}>
				<div className={styles.header}>
					<Header displaySidebar={this.displaySidebar} />
				</div>
				<div className={styles.body}>
					<Body />
				</div>
				{this.state.displaySideBar ? (
					<div className={styles.sidebar}>
						<Sidebar />
					</div>
				) : null}
			</div>
		);
	}
}

export default App;
