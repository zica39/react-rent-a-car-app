import logo from './logo.svg';
import './App.css';
import EmployeeLayout from "./components/layout/EmployeeLayout";

function App() {
  return (
    <div className="App">
      <EmployeeLayout>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      </EmployeeLayout>
    </div>
  );
}

export default App;
