import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import './App.css';
import 'antd/dist/antd.css';  

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {/* <Dashboard />  */}
            <Login />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
