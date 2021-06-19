import logo from '../../../logo.svg';
import {auth,_} from "../../../functions/tools";

const Home = () => {

    return <header key="2" className="App-header" style={{minHeight:'auto',height:window.innerHeight-200,background:'none'}}>
        <p style={{color:"black"}}>{_('welcome')} <u>{auth().name}</u> {_('app')}</p>
        <img src={logo} className="App-logo" alt="logo" />
    </header>
}

export default Home;