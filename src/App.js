import logo from './logo.svg';
import './App.css'
import './bootstrap-css/css/bootstrap.css'
import StarWars from './Components/MyItem'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          <StarWars />
        </div>
        <a className="nav-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

/*function HelloWorld(){
  return (
    <div>
       Hello World
    </div>
  );
}*/

export default App;
