import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './Components/Router/MainRouter';

const App = () => {
	return (
		<BrowserRouter>
			<MainRouter />
		</BrowserRouter>
	);
}

export default App;
