import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import './TopNavigation.scss';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";
import {AppState} from "../../store/configureStore";
import * as actions from "../../store/actions/index";

const TopNavigation: React.FC = (props) => {
    const auth = useSelector((state: AppState) => {
       return state.auth;
    });
    const dispatch = useDispatch();
    const [navExpanded, setNavExpanded] = useState(false);
    let history = useHistory();
    const onClickSignin = () => {
        history.push('/auth');
        setNavExpanded(false);
    };
    const onClickLogout = () => {
        history.push('/');
        dispatch(actions.authLogout());
        setNavExpanded(false);
    };
    let authButton = (<Button variant="danger" size="sm" className='ml-3 ml-lg-4 px-3' onClick={() => {onClickSignin()} }>Sign in</Button>);
    if (auth.token !== '' && !auth.loading) {
        authButton = (<Button variant="danger" size="sm" className='ml-3 ml-lg-4 px-3' onClick={() => {onClickLogout()} }>Logout</Button>);
    }
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top" className="customNavbar" expanded={navExpanded}>
            <div className="container">
                <Link to="/" className='navbar-brand'>InnoEco</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setNavExpanded(!navExpanded)} />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/" className='navLink' onClick={() => setNavExpanded(false)}>My feed</Link>
                        <Link to="/" className='navLink' onClick={() => setNavExpanded(false)}>Wiki</Link>
                        <Link to="/" className='navLink' onClick={() => setNavExpanded(false)}>Pitch hub</Link>
                        <Link to="/" className='navLink' onClick={() => setNavExpanded(false)}>About</Link>
                        { auth.token !== '' && !auth.loading && (
                            <Link to="/profile" className='navLink' onClick={() => setNavExpanded(false)}>My profile</Link>
                        )}
                    </Nav>
                    {authButton}
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default TopNavigation;
