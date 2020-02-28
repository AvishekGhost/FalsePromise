import React from "react";
import classes from './Reciever.module.css';
import Particles from '../../Home/ParticleContainer';

const Reciever = () => {
	document.body.className = classes.bcg;
	return (
		<div>
			<Particles />
			<h1>rec </h1>
		</div>
	);
};
export default Reciever;
