import './App.css';
import {Switch, Route} from 'react-router-dom';
import {QueryClient,QueryClientProvider} from 'react-query';
import PrivateRoute from "./privateRoute/PrivateRoute";
import {ROLES} from "./constants/config";

import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";

import Clients from "./pages/clients/Clients";

import Cars from "./pages/cars/Cars";

import Reservations from "./pages/reservations/Reservations";
import CreateReservation from "./pages/reservations/CreateReservation";

function App() {

    const queryClient = new QueryClient();

  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Switch>
                    <PrivateRoute path="/clients" exact component={Clients} isPrivate role={ROLES.EMPLOYEE}/>
                    <PrivateRoute path="/cars" exact component={Cars} isPrivate role={ROLES.EMPLOYEE} />
                    <PrivateRoute path="/reservations" exact component={Reservations} isPrivate role={ROLES.EMPLOYEE} />
                    <PrivateRoute path="/reservations/create" exact component={CreateReservation} isPrivate role={ROLES.EMPLOYEE}/>

                    <PrivateRoute exact path="/login" component={Login}/>
                    <PrivateRoute exact  path="/"  isPrivate role={ROLES.ANY}/>
                    <Route component={NotFound}  />
                </Switch>
            </div>
        </QueryClientProvider>
    </div>
  );
}

export default App;
