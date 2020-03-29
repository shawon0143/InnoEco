import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './index.scss';
import 'simple-line-icons/css/simple-line-icons.css';

// import components
import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import Auth from "./containers/Auth/Auth";
import VerifyAccount from "./containers/VerifyAccount/VerifyAccount";
import ResetPassword from "./containers/ResetPassword/ResetPassword";

const App: React.FC = (props) => {
    let routes = (
        <Switch>
            <Route path='/verifyAccount/:token' component={VerifyAccount} />
            <Route path='/resetPassword/:token' component={ResetPassword}/>
            <Route path="/" exact component={Home}/>
            <Route path="/auth" exact component={Auth}/>
            {/* TODO: Create a nice 404 not found component */}
            <Route render={() => <h3 className='text-dark text-center' style={{marginTop: 64}}>404 - Page Not Found !</h3>}/>
            <Redirect to='/' />
        </Switch>
    );
    return (
        <React.Fragment>
            <Layout>
                {routes}
            </Layout>
        </React.Fragment>
    );
};

export default App;

