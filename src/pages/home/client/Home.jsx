import logo from '../../../logo.svg';

const Home = () => {

    return <header key="1" className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Client home
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
}

export default Home;