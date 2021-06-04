import './App.css';
import {Switch, Route} from 'react-router-dom';
import {QueryClient,QueryClientProvider} from 'react-query';
import Login from "./pages/login/Login";
import EmployeeHome from "./pages/home/employee/Home";
import ClientHome from "./pages/home/client/Home"
import NotFound from "./pages/notFound/NotFound";
import PrivateRoute from "./privateRoute/PrivateRoute";
import {ROLES} from "./constants/config";
import {auth} from "./functions/tools";

function App() {

    const queryClient = new QueryClient();
    const Home = (auth()?.role === ROLES.EMPLOYEE)?EmployeeHome:ClientHome;

  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Switch>
                    {/*<PrivateRoute path="/users" exact component={Users} isPrivate/>
                    <PrivateRoute path="/cars" exact component={Cars} isPrivate/>
                    <PrivateRoute path="/reservations" exact component={Reservations} isPrivate/>*/}

                    <PrivateRoute exact path="/login" component={Login}/>
                    {/*<PrivateRoute path="/register" component={Register}/>*/}
                    <PrivateRoute exact  path="/" component={Home} isPrivate role={ROLES.ANY}/>
                    <Route component={NotFound}  />
                </Switch>
            </div>
        </QueryClientProvider>
    </div>
  );
}

export default App;
