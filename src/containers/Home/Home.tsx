import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import './Home.scss';
import RecentWiki from "../../components/RecentWiki/RecentWiki";
import RecentPitch from "../../components/RecentPitch/RecentPitch";
import hrLeftSvg from "../../assets/images/hrLeft.svg";
import hrRightSvg from "../../assets/images/hrRight.svg";
import shapeSvg from "../../assets/images/joinUsShape.svg";
import {useDispatch} from "react-redux";
import * as actions from "../../store/actions/index";

const Home: React.FC = () => {
    let dispatch = useDispatch();
    let history = useHistory();
    useEffect(() => {
        window.scrollTo(0,0);
        dispatch(actions.getAllKnowledge());
    }, [dispatch]);
    return (
        <React.Fragment>
            <div className="container-fluid homeContainer topNavMargin">
                <div className="row">
                    <div className="col homepageBannerWrapper">
                        <span className="bigBoldTitle">InnoEco</span>
                        <p>
                            A dynamic and interactive digital service platform
                            for the Development of an University based
                            innovation ecosystem.
                        </p>
                        <button className="btn btn-danger mt-2 ml-2">
                            Read more
                        </button>
                    </div>
                </div>
            </div>
            {/* ========== Recent Pitch ========== */}
            <RecentPitch />

            {/* ========= Call to Action ======= */}
            <div className="position-relative joinInnoEcoWrapper">
                <div className="container text-center callToActionContainer">
                    <div className="mx-auto mb-5" style={{maxWidth: 640}}>
                        <h2 className="h1 mb-3">Join InnoEco</h2>
                        <p>Our strategy is simple: to create a place where the best researchers, entrepreneurs and most promising
                            students can achieve their full potential.</p>
                    </div>
                    <button className='btn btn-danger br-2' onClick={() => history.push('/auth') }>Sign in Now</button>
                    <img src={hrLeftSvg} alt="" style={{width: 30}}/>
                    <span className="align-center text-primary mx-1">or</span>
                    <img src={hrRightSvg} alt="" style={{width: 30}}/>
                    <button className='btn btn-outline-primary bl-2'>Contact Us</button>
                </div>
                <img src={shapeSvg} alt="" style={{position: 'absolute', bottom: 0, zIndex: -1, left: 0, overflow: 'hidden'}}/>
            </div>
            {/* ========== Recent WIkI ========== */}
            <RecentWiki />
        </React.Fragment>
    );
};

export default Home;
