import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Main from './Main';
import LapakForm from "./components/Form";
import LoginForm from "./components/Login";
import MyNav from './components/Nav';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <MyNav />
                    <hr />

                    <Switch>
                        <Route exact path="/">
                            <Main />
                        </Route>
                        <Route path="/addlapak">
                            <LapakForm />
                        </Route>
                        <Route path="/login">
                            <LoginForm />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;