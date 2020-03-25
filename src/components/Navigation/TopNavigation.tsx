import React from 'react';
import './TopNavigation.scss';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";

const TopNavigation: React.FC = (props) => {
    let history = useHistory();
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top" className="customNavbar">
            <div className="container">
                <Link to="/" className='navbar-brand'>InnoEco</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/" className='navLink'>Home</Link>
                        <Link to="/" className='navLink'>Newsfeed</Link>
                        <Link to="/" className='navLink'>About</Link>
                        <Link to="/" className='navLink'>Contacts</Link>
                    </Nav>
                    <Button variant="outline-danger" size="sm" className='ml-3 ml-lg-4 px-3' onClick={() => { history.push('/auth')} }>Sign in</Button>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default TopNavigation;
