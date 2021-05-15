import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Main from './Main';
import LapakForm from "./components/LapakForm";
import LoginForm from "./components/Login";
import MyNav from './components/Nav';
import useToken from './useToken';


function App() {
    const { token, setToken } = useToken();

    if(!token) {
        return <LoginForm setToken={setToken} />
    }

    return (
        <Router>
            <div>
                <MyNav />
                <hr />
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/addlapak" component={LapakForm} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;