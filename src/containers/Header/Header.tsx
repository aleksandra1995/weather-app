import React, { Component } from "react";
import sidebar from "./sidebar.png";
import logo from "./logo.png";
import styles from "./Header.module.scss";

interface Props {
	displaySidebar: () => void;
}

class Header extends Component<Props, {}> {
	render() {
		const timeNow = new Date().toDateString();

		return (
			<div className={styles.container}>
				<div onClick={this.props.displaySidebar} className={styles.sidebar}>
					<img height='50' src={sidebar} alt='sidebar toggle' />
				</div>
				<div className={styles.logo}>
					<img height='80' src={logo} alt='logo' />
				</div>
				<div className={styles.time}>{timeNow}</div>
			</div>
		);
	}
}

export default Header;
