import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Route, Switch, Redirect } from 'react-router-dom';
import './index.scss';
import 'simple-line-icons/css/simple-line-icons.css';
import * as actions from "../src/store/actions/index";

// import components
import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import Auth from "./containers/Auth/Auth";
import VerifyAccount from "./containers/VerifyAccount/VerifyAccount";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import Profile from "./containers/Profile/Profile";
import Wiki from "./containers/Wiki/Wiki";
import PitchHub from "./containers/PitchHub/PitchHub";
import About from "./components/About/About";
import {AppState} from "./store/configureStore";
import CreateKnowledgeForm from "./components/Knowledge/CreateKnowledgeForm/CreateKnowledgeForm";

const App: React.FC = (props) => {
    const auth = useSelector((state: AppState) => {
       return state.auth;
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.authCheckState());
    }, [dispatch]);
    let routes = (
        <Switch>
            <Route path='/verifyAccount/:token' component={VerifyAccount} />
            <Route path='/resetPassword/:token' component={ResetPassword}/>
            <Route path="/" exact component={Home}/>
            <Route path="/auth" exact component={Auth}/>
            <Route path="/about" exact component={About}/>
            <Route path="/wiki" exact component={Wiki} />
            <Route path="/wiki/:id" exact component={Wiki} />
            <Route path="/pitchHub" exact component={PitchHub} />
            <Route path="/pitchHub/:id" exact component={PitchHub} />
            {/* TODO: Create a nice 404 not found component */}
            <Route render={() => <h3 className='text-dark text-center' style={{marginTop: 64, height: '35vh'}}>404 - Page Not Found !</h3>}/>
            <Redirect to='/' />
        </Switch>
    );

    if (!auth.loading && auth.token !== '') {
        routes = (
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/profile" exact component={Profile} />
                <Route path="/about" exact component={About}/>
                <Route path="/wiki" exact component={Wiki} />
                <Route path="/wiki/:id" exact component={Wiki} />
                <Route path="/pitchHub" exact component={PitchHub} />
                <Route path="/pitchHub/:id" exact component={PitchHub} />
                <Route path="/knowledge" exact component={CreateKnowledgeForm} />
                <Redirect to='/' />
            </Switch>
        );
    }
    return (
        <React.Fragment>
            <Layout>
                {routes}
            </Layout>
        </React.Fragment>
    );
};

export default App;

