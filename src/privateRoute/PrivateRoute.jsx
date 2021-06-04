import React,{Suspense} from 'react';
import {Route,useHistory,useLocation} from 'react-router-dom';
import Forbidden from "../pages/forbidden/Forbidden";
import EmployeeLayout from "../components/layout/EmployeeLayout";
import ClientLayout from "../components/layout/ClientLayout";
import BasicLayout from "../components/layout/BasicLayout";
import {auth} from "../functions/tools";
import {ROLES} from "../constants/config";

import EmployeeHome from "../pages/home/employee/Home";
import ClientHome from "../pages/home/client/Home";

const PrivateRoute = ({component: Component, isPrivate, role, path, ...rest}) => {
    const Layout = isPrivate ? auth()?.role === ROLES.EMPLOYEE?EmployeeLayout:ClientLayout : BasicLayout;
    const history  = useHistory();
	const location = useLocation();

	if(path === '/')Component = (auth()?.role === ROLES.EMPLOYEE)?EmployeeHome:ClientHome;

    if(auth() && !isPrivate)history.push('/');
	if(!auth() && isPrivate && location.pathname === '/')history.push('/login');

    return <Route {...rest} component={() => {
        if((isPrivate && auth()) && ((role === auth()?.role) || (role === ROLES.ANY))) return <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...rest}/>
        </Suspense></Layout>;
        else if((isPrivate && auth()) && (role !== auth()?.role))return <Forbidden/>;
        else if( (isPrivate &&  !auth()))  return <Forbidden/>;
        else if(auth() && !isPrivate) return <></>;
        else return <Layout>
                <Suspense fallback={<div>Loading...</div>}>
                <Component {...rest}/>
            </Suspense>
        </Layout>;
    }}/>
}

export default PrivateRoute;
