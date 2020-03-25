import React from 'react';
import TopNavigation from "../../components/Navigation/TopNavigation";

const Layout: React.FC = (props) => {
    return (
        <React.Fragment>
            <TopNavigation/>
            <main>
                {props.children}
            </main>
        </React.Fragment>
    );
};

export default Layout;

