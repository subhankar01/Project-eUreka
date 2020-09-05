import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Importing Pages
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import PrivateRoute from "./components/PrivateRoute";
import Appointment from "./pages/services/Appointment";
import Medicine from "./pages/services/Medicine";
import Heart from "./pages/services/Heart";
import Pneumonia from "./pages/services/Pneumonia";
import Cancer from "./pages/services/Cancer";
import DashboardDoc from "./pages/DashboardDoc";

const App = () => {
	return (
		<div className="App">
			<Router>
				<NavBar />
				<Switch>
					<Route path="/" exact component={Home} />
					<PrivateRoute
						path="/dashboard"
						exact
						component={Dashboard}
					/>
					<Route path="/signup" exact component={SignUp} />
					<Route path="/login" exact component={Login} />
					<PrivateRoute
						path="/dashboard/cancer"
						exact
						component={Cancer}
					/>
					<PrivateRoute
						path="/dashboard/pneumonia"
						exact
						component={Pneumonia}
					/>
					<PrivateRoute
						path="/dashboard/medicine"
						exact
						component={Medicine}
					/>
					<PrivateRoute
						path="/dashboard/doctor"
						exact
						component={Appointment}
					/>
					<PrivateRoute
						path="/dashboard/heart"
						exact
						component={Heart}
					/>
					<PrivateRoute
						path="/dashboardDoc"
						exact
						doc
						component={DashboardDoc}
					/>
				</Switch>
				<Footer />
			</Router>
		</div>
	);
};

export default App;
