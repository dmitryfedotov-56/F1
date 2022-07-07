import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import openWeather from './OpenWeather'

const twodays  = openWeather.period1;
const fullweek = openWeather.period2;

import "../styles/Main.css";

// console.log(openWeather);


const cities = [ 
	{name: "Москва", 			lattitude: "56", longitude: "37"}, 
	{name: "Санкт-Петербург", 	lattitude: "60", longitude: "30"},
	{name: "Самара", 			lattitude: "53", longitude: "50"},
	{name: "Краснодар", 		lattitude: "42", longitude: "38"},
	{name: "Сочи", 				lattitude: "43", longitude: "40"}
];

function Main(){
	
	const [result, setResult]   = useState(false);

	function City(props)	// city line in th list
	{
		return (
			<tr>
				<td>{props.props.name}</td>
				<td><Button variant="success" 
					onClick={() => {openWeather.getData(props.props, "два дня", setResult);}}>Два дня</Button></td>
				<td><Button variant="success" 
					onClick={() => {openWeather.getData(props.props, "неделю", setResult);}}>Неделя</Button></td>
			</tr>
		)
	};
	
	function Cities()	// list of cities
	{
		return (
			<div>
			<br />
			<Table bordered hover className={"items"}>
			<thead>
				<tr>
					<th>Город</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{cities.map(city => <City key={city.name} props={city}/>)}
			</tbody>
			</Table>	
			</div>
		)
	};
	
		
	if(result) return openWeather.putData(result);
	return Cities();
}

export default Main;
