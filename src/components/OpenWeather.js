import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios";

import "../styles/Main.css";

const API_KEY = "885fbf4f972a09db5be988ef4fa49a90";

function openweatherUrl(city)	// get openweather url 
{
	let url = "https://api.openweathermap.org/data/2.5/onecall?";
	url += "lat=" + city.lattitude;
	url += "&"
	url += "lon=" + city.longitude;	
	url += "&units=metric"
	url += "&appid="
	url += API_KEY;
	return url;
};

function twoSymbols(s)
{
	if(s.length == 1) return "0" + s;
	return s;
};

function timeStamp(dt)
{
	let day, month, hour, minute;
	let date = new Date(dt*1000);
	day = twoSymbols(date.getDate().toString());
	month = twoSymbols((date.getMonth()+1).toString());
	hour = twoSymbols(date.getHours().toString());
	minute = twoSymbols(date.getHours().toString());
	return day + "." + month + " " + hour + ":" + minute;
};

/*	
	get result for some city amd some period
	
	city 			city object (name, coordinates)
	preiod			period represened by line
	resultReceived	function to be called when the result is recived
*/		

let getResult = function(city, period, resultReceived)	// get result for some city amd some period
{
	let result;
	let url = openweatherUrl(city);
	console.log(url);
	axios.get(url).then(res => { 
		// console.log(res);
		result = {}
		result.city = city;
		result.period = period;
		result.forecast = res;
		resultReceived(result)
	})
};

const twodays = "два дня"
const fullweek = "неделю"

function putDaily(items)
{
	console.log(items);

	return (
		<Table bordered hover className={"items"}>
			<thead>
				<tr>
					<th>Время</th>
					<th>День</th>
					<th>Ночь</th>
					<th>Облачность</th>					
					<th>Осадки</th>
					<th>Ветер</th>
					<th>Давление</th>
					<th>Влажность</th>
				</tr>
			</thead>
			<tbody>
				{items.map(item => <tr key={item.dt}>
					<td>{timeStamp(item.dt)}</td>
					<td>{item.temp.day}</td>
					<td>{item.temp.night}</td>
					<td>{item.clouds}</td>
					<td>{item.rain}</td>
					<td>{item.wind_speed}</td>
					<td>{item.pressure}</td>
					<td>{item.humidity}</td>
				</tr>)}
			</tbody>
		</Table>
		)	
};

function putHourly(items)
{
	console.log(items);

	return (
		<Table bordered hover className={"items"}>
			<thead>
				<tr>
					<th>Время</th>
					<th>Температура</th>
					<th>Облачность</th>
					<th>Ветер</th>
					<th>Давление</th>
					<th>Влажность</th>
				</tr>
			</thead>
			<tbody>
				{items.map(item => <tr key={item.dt}>
					<td>{timeStamp(item.dt)}</td>
					<td>{item.temp}</td>
					<td>{item.clouds}</td>
					<td>{item.wind_speed}</td>
					<td>{item.pressure}</td>
					<td>{item.humidity}</td>
				</tr>)}
			</tbody>
		</Table>
		)	
};


function putForecast(period, forecast)
{
	if(period == fullweek) return putDaily(forecast.data.daily);
	if(period == twodays) return putHourly(forecast.data.hourly);
};

let putResult = function(result)	// function to render the result
{
	return(
	<div>
	<br />
	<h3>{result.city.name}{", прогноз на " + result.period}</h3>
		{putForecast(result.period, result.forecast)}
	</div>
	)
};

const openWeather =
{
	getData : getResult,
	putData : putResult,
	period1 : twodays,
	period2 : fullweek
};

export default openWeather;


