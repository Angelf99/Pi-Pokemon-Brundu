import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Landingpage from './components/LandingPage/Landingpage'
import Home from './components/Home/Home'
import PokemonCreate from './components/PokemonCreate/PokemonCreate';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Landingpage}/>
          <Route exact path='/home' component={Home}/>
          <Route path='/create' component={PokemonCreate} />
          <Route path='/home/:id' component={Detail}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
