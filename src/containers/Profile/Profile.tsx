import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Profile.scss';
import { AppState } from '../../store/configureStore';
import ProfileInfo from "../../components/Profile/ProfileInfo/ProfileInfo";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

interface IProps {}
const Profile: React.FC<IProps> = (props: IProps) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getUserByEmail());
    }, [dispatch]);
    const userProfile = useSelector((state: AppState) => {
        return {
            firstName: state.auth.firstName,
            lastName: state.auth.lastName,
            role: state.auth.role[0],
            address: state.auth.address,
            mobile: state.auth.mobile,
            phone: state.auth.phone,
            loading: state.auth.userDetailsLoading,
            error: state.auth.userDetailsError
        };
    });
    const [selectedOption, setSelectedOption] = useState('profile');
    let profileInfo = <Spinner />;
    if (!userProfile.loading && userProfile.error === '') {
        profileInfo = <ProfileInfo userInfo={userProfile}/>;
    }
    return (
        <div className="container profileContainer topNavMargin p-3">
            <div className="row">
                <div className="col-lg-3">
                    {/* === User Image ==== */}
                    <div className="block-hover position-relative">
                        <figure className="mb-0">
                            <img
                                className="img-fluid w-100 block-hover__main--zoom-v1"
                                src={require('../../assets/images/avatar.png')}
                                alt=""
                            />
                        </figure>
                        {/* ==== Edit icon on hover ==== */}
                        <figcaption
                            className="block-hover__additional--fade p-5"
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                        >
                            <div className="block-hover__additional--fade block-hover__additional--fade-up iconWrapper">
                                <ul className="list-inline text-center mt-auto mb-5">
                                    <li className="list-inline-item align-center">
                                        <i className="text-light icons icon-note" />
                                    </li>
                                </ul>
                            </div>
                        </figcaption>
                        {/* ==== User info ==== */}
                        <span className="userInfo">
                            <span className="d-block bg-danger text-light py-1 px-2">
                                {userProfile.firstName +
                                    ' ' +
                                    userProfile.lastName}
                            </span>
                            <small className="bg-primary text-light py-1 px-2">
                                {userProfile.role}
                            </small>
                        </span>
                    </div>
                    {/* === END User Image ==== */}
                    {/* === Sidebar navigation ==== */}
                    <div className="list-group mb-4">
                        {/* ==== Profile ==== */}
                        <button
                            onClick={() => setSelectedOption('profile')}
                            className={`navBtn list-group-item list-group-item-action justify-content-between rounded-0 ${
                                selectedOption === 'profile'
                                    ? 'navButtonSelected'
                                    : ''
                            }`}
                        >
                            <span>
                                <i className="icons icon-cursor" /> Profile
                            </span>
                        </button>
                        {/* ==== END profile ======= */}
                        {/* ==== My contribution ==== */}
                        <button
                            onClick={() => setSelectedOption('contribution')}
                            className={`navBtn list-group-item list-group-item-action justify-content-between rounded-0 ${
                                selectedOption === 'contribution'
                                    ? 'navButtonSelected'
                                    : ''
                            }`}
                        >
                            <span>
                                <i className="icons icon-layers" /> My
                                Contributions
                            </span>
                            {/*<span className="bg-primary rounded-circle text-light px-1">9</span>*/}
                        </button>
                        {/* ==== END My contribution ==== */}
                        {/* ==== Settings ======= */}
                        <button
                            onClick={() => setSelectedOption('settings')}
                            className={`navBtn list-group-item list-group-item-action justify-content-between rounded-0 ${
                                selectedOption === 'settings'
                                    ? 'navButtonSelected'
                                    : ''
                            }`}
                        >
                            <span>
                                <i className="icons icon-settings" /> Settings
                            </span>
                            {/*<span className="bg-info rounded-circle px-1">3</span>*/}
                        </button>
                        {/* ==== END settings ===== */}
                    </div>
                    {/* === END Sidebar navigation ==== */}
                </div>
                <div className="col-lg-9">
                    {selectedOption === 'profile' && (
                        profileInfo
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
