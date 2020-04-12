import React, { Component } from "react";
import Particles from "react-particles-js";

const particleParameters = () => {
	return {
		particles: {
			number: {
				value: 160,
				density: {
					enable: false
				}
			},
			size: {
				value: 4,
				random: true,
				anim: {
					speed: 5,
					size_min: 0.5
				}
			},
			line_linked: {
				enable: false
			},
			move: {
				random: true,
				speed: 1,
				direction: "top",
				out_mode: "out"
			}
		},
		interactivity: {
			events: {
				onhover: {
					enable: true,
					mode: "bubble"
				},
				onclick: {
					enable: true,
					mode: "repulse"
				}
			},
			modes: {
				bubble: {
					distance: 200,
					duration: 2,
					size: 0,
					opacity: 0
				},
				repulse: {
					distance: 300,
					duration: 4
				}
			}
		}
	};
};

class ParticleContainer extends Component {
	render() {
		return (
			<Particles
				params={particleParameters()}
				style={{
					position: "absolute",
					width: "100%",
					height: "200%",
					zIndex: "-1"
				}}
			/>
		);
	}
}
export default ParticleContainer;
