import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Create from './components/Create';
import School from './components/School';
import Edit from './components/Edit';
import './App.css';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/create" component={Create}/>
        <Route path="/school/:id" component={School} />
        <Route path="/edit/:id" component={Edit} />
      </Switch>
    </Router>
  );
}

export default App;
