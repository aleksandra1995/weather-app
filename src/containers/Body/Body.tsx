import React, { Component } from "react";
import styles from "./Body.module.scss";
import goBack from "./go_back.png";
var moment = require("moment");

const APIKEY = "12578854c874f0739e611a31a0d796c4";

interface Forecast {
	dt_txt: "";
	weather: [
		{
			icon: "";
			description: "";
		}
	];
	main: {
		temp: "";
	};
}

class Body extends Component {
	state = {
		submit: false,
		value: "",
		forecastData: {
			list: [
				{
					main: {
						temp: "",
					},
					dt_txt: "",
				},
			],
		},
		currentWeatherDescription: "",
		currentWeatherTemp: "",
		currentWeatherHumiditi: "",
		currentWeatherWind: "",
		forecast: [],
	};
	handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.value}&units=imperial&APPID=${APIKEY}`
		)
			.then((resp) => resp.json())
			.then((data) => {
				this.setState({ forecastData: data });
				this.forecast();
			})
			.catch(() => {});

		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&units=imperial&APPID=${APIKEY}`
		)
			.then((resp) => resp.json())
			.then((data) =>
				this.setState({
					currentWeatherDescription: data.weather[0].description,
					currentWeatherTemp: Math.round(data.main.temp),
					currentWeatherHumiditi: data.main.humidity,
					currentWeatherWind: data.wind.speed,
					submit: true,
				})
			)
			.catch((err) => {
				alert("Please enter a valid city name");
			});
	};

	handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ value: e.target.value });
	};

	forecast = () => {
		let item = this.state.forecastData.list;
		for (let i = 0; i < item.length - 1; i++) {
			let date = new Date(item[i].dt_txt).toDateString();
			let nextDate = new Date(item[i + 1].dt_txt).toDateString();
			if (date !== nextDate && nextDate) {
				this.setState({ forecast: [...this.state.forecast, item[i]] });
			}
		}
	};

	goBack = () => {
		this.setState({
			submit: false,
			value: "",
			forecastData: {
				list: [
					{
						main: {
							temp: "",
						},
						dt_txt: "",
					},
				],
			},
			currentWeatherTemp: "",
			currentWeatherHumiditi: "",
			currentWeatherWind: "",
			forecast: [],
		});
	};
	render() {
		const forecast = this.state.forecast.map((item: Forecast) => {
			let day = moment(item.dt_txt).format("dddd");
			return (
				<div>
					<h3>{day}</h3>
					<img
						height='50'
						alt='weather icon'
						src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
					/>
					<div>{item.main.temp}</div>
					<div> {item.weather[0].description}</div>
				</div>
			);
		});
		return (
			<div className={styles.container}>
				<div className={styles["weather-card"]}>
					{this.state.submit ? (
						<div className={styles["display-weather-container"]}>
							<div onClick={this.goBack} className={styles["go-back"]}>
								<img height='50' src={goBack} alt='Go Back' />
								<div>Back</div>
							</div>
							<div className={styles["weather-now"]}>
								<div className={styles.stats}>
									<span className={styles.temp}>
										{this.state.currentWeatherTemp}°
									</span>
									<br />
									<span className={styles.description}>
										{this.state.currentWeatherDescription.toUpperCase()}
									</span>
									<br />
									Humidity {this.state.currentWeatherHumiditi}% | Wind{" "}
									{this.state.currentWeatherWind} MPH
								</div>
								<div className={styles.city}>
									{" "}
									<u>{this.state.value}</u>{" "}
								</div>
							</div>
							<div className={styles["weather-forecast"]}>{forecast}</div>
						</div>
					) : (
						<div className={styles["search-city-container"]}>
							<label>Please Enter A City</label>
							<form
								onSubmit={this.handleSubmit}
								className={styles["citi-form"]}
							>
								<input
									value={this.state.value}
									onChange={this.handleOnChange}
									className={styles["input-field"]}
									type='text'
									placeholder='Type The City Name'
								/>
								<br />
								<button type='submit'>Submit</button>
							</form>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Body;
