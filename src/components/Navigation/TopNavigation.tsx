import React, {useState} from 'react';
import './TopNavigation.scss';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";

const TopNavigation: React.FC = (props) => {
    const [navExpanded, setNavExpanded] = useState(false);
    let history = useHistory();
    let onClickSignin = () => {
        history.push('/auth');
        setNavExpanded(false);
    };
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top" className="customNavbar" expanded={navExpanded}>
            <div className="container">
                <Link to="/" className='navbar-brand'>InnoEco</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setNavExpanded(!navExpanded)} />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/" className='navLink' onClick={() => setNavExpanded(false)}>Home</Link>
                        <Link to="/" className='navLink' onClick={() => setNavExpanded(false)}>Newsfeed</Link>
                        <Link to="/" className='navLink' onClick={() => setNavExpanded(false)}>About</Link>
                        <Link to="/" className='navLink' onClick={() => setNavExpanded(false)}>Contacts</Link>
                    </Nav>
                    <Button variant="outline-danger" size="sm" className='ml-3 ml-lg-4 px-3' onClick={() => {onClickSignin()} }>Sign in</Button>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default TopNavigation;
