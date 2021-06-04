import './App.css';
import {Switch, Route} from 'react-router-dom';
import {QueryClient,QueryClientProvider} from 'react-query';
import PrivateRoute from "./privateRoute/PrivateRoute";
import {ROLES} from "./constants/config";

import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";

import Users from "./pages/users/Users";
import Cars from "./pages/cars/Cars";
import Reservations from "./pages/reservations/Reservations";

function App() {

    const queryClient = new QueryClient();

  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Switch>
                    <PrivateRoute path="/users" exact component={Users} isPrivate role={ROLES.EMPLOYEE}/>
                    <PrivateRoute path="/cars" exact component={Cars} isPrivate role={ROLES.EMPLOYEE} />
                    <PrivateRoute path="/reservations" exact component={Reservations} isPrivate role={ROLES.EMPLOYEE} />

                    <PrivateRoute exact path="/login" component={Login}/>
                    {/*<PrivateRoute path="/register" component={Register}/>*/}
                    <PrivateRoute exact  path="/"  isPrivate role={ROLES.ANY}/>
                    <Route component={NotFound}  />
                </Switch>
            </div>
        </QueryClientProvider>
    </div>
  );
}

export default App;
