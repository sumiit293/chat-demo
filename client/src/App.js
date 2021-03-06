import React, { Component } from 'react'
import {Provider} from 'react-redux'
import Chat from './components/chat-screen/Chat'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login/Login'
import Signup from './components/login/Signup'
import PrivateRoute from './components/routing/PrivateRoute'
import store from './store';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <div>
            <ToastContainer/>
            <Router>
              <Switch>
                  <Route path="/" exact component={Login} />
                  <Route path="/signup" exact component={Signup} />
                  <PrivateRoute path="/chat" exact component={Chat} />
                  <Route path="*" component={Login}/>
                </Switch>
            </Router>
          </div>
      </Provider>
    )
  }
}

export default App
