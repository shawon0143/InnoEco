import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Profile.scss';
import { AppState } from '../../store/configureStore';
import ProfileInfo from "../../components/Profile/ProfileInfo/ProfileInfo";
import MyContributions from "../../components/Profile/MyContributions/MyContributions";
import MyEvents from "../../components/Profile/MyEvents/MyEvents";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import ImageCropper from "../../components/UI/ImageCropper/ImageCropper";
import {showScrollbar, hideScrollBar} from "../../hoc/scrollLock/scrollLock";
import {uploadFile} from "../../shared/axios";
import axios from 'axios';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


interface IProps {}
const Profile: React.FC<IProps> = (props: IProps) => {
    const dispatch = useDispatch();
    const userEmail = useSelector((state: AppState) => state.auth.email);
    useEffect(() => {
        window.scrollTo(0,0);
        dispatch(actions.getUserByEmail(userEmail));
    }, [dispatch, userEmail]);
    const userProfile = useSelector((state: AppState) => {
        return {
            firstName: state.auth.firstName,
            lastName: state.auth.lastName,
            role: state.auth.role[0],
            address: state.auth.address,
            mobile: state.auth.mobile,
            phone: state.auth.phone,
            loading: state.auth.userDetailsLoading,
            error: state.auth.userDetailsError,
            imageUrl: state.auth.imageUrl
        };
    });
    const [selectedOption, setSelectedOption] = useState('profile'); // left navigation option
    const [showCropperModal, setShowCropperModal] = useState(false); // show hide image cropper modal
    const [tempPic, setTempPic] = useState('');
    let profileInfo = <Spinner />;
    if (!userProfile.loading && userProfile.error === '') {
        profileInfo = <ProfileInfo userInfo={userProfile}/>;
    }
    if (userProfile.error !== '') {
        profileInfo = <small className='text-danger'> Oops! Something went wrong.</small>
    }

    let profilePic = require('../../assets/images/avatar.png');
    if (userProfile.imageUrl !== '') {
        profilePic = userProfile.imageUrl;
    }
    if (tempPic !== '') {
        profilePic = tempPic;
    }
    // console.log(userProfile.imageUrl);
    // save file
    const callBackFromImageEditor = (imageFile: any) => {
        let fileName = imageFile.name +"-profilePic(" + Date.now() + ")";
        if (userProfile.imageUrl !== '') {
            dispatch(actions.deleteFile(userProfile.imageUrl.substring(userProfile.imageUrl.lastIndexOf('/') + 1)))
        }
        uploadFile(imageFile, fileName, imageFile.type, (err: any, result: any) => {
            if (err) {
                console.log(err)
            } else {
                console.log(result);
                let data = {
                    imageUrl: result
                };
                dispatch(actions.saveUserImage(data));
                setTempPic(result);
            }
        });
    };
    return (
        <div className="container profileContainer topNavMargin p-4">
            <div className="row">
                <div className="col-lg-3">
                    {/* === User Image ==== */}
                    <div className="block-hover position-relative">
                        <figure className="mb-0">
                            <img
                                className="img-fluid w-100 block-hover__main--zoom-v1"
                                src={profilePic}
                                alt=""
                            />
                        </figure>
                        {/* ==== Edit icon on hover ==== */}
                        <figcaption
                            className="block-hover__additional--fade p-5"
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                        >
                            <div className="block-hover__additional--fade block-hover__additional--fade-up iconWrapper">
                                <ul className="list-inline text-center mb-0">
                                    <li className="list-inline-item align-center d-inline-block">
                                        <div id="drop_zone">
                                            <label htmlFor="fileUpload"
                                                   className=" pointerCursor mb-0 text-primary d-inline-block">
                                                <i className="text-light icons icon-note" onClick={() => {setShowCropperModal(true); hideScrollBar();}} />
                                                {/*<input id="fileUpload" type="file" name="myFile" className="d-none" onClick={() => setShowCropperModal(true)} />*/}
                                            </label>
                                        </div>
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
                    <div className="list-group mb-5 shadow-sm">
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
                                <i className="icons icon-layers" /> Create Contribution
                            </span>
                        </button>
                        {/* ==== END My contribution ==== */}
                        {/* ==== Events ======== */}
                        <button
                            onClick={() => setSelectedOption('events')}
                            className={`navBtn list-group-item list-group-item-action justify-content-between rounded-0 ${
                                selectedOption === 'events'
                                    ? 'navButtonSelected'
                                    : ''
                            }`}
                        >
                            <span>
                                <i className="icons icon-calendar"/> Create Event
                            </span>
                        </button>
                        {/* ======= End of events ======= */}
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
                    {/* ======= Profile detail view ========= */}
                    {selectedOption === 'profile' && (
                        profileInfo
                    )}
                    {/* ======= My Contribution view ========   */}
                    {selectedOption === 'contribution' && (
                        <MyContributions />
                    )}
                    {/* ======= My Events view ========   */}
                    {selectedOption === 'events' && (
                        <MyEvents />
                    )}
                </div>
            </div>
        {/*  ============  MODAL Image cropper ============ */}

            <ImageCropper
                show={showCropperModal}
                hideDropZoneModal={() => {setShowCropperModal(false); showScrollbar();}}
                aspectRatio={1} // 16/9 if requires rectangle
                requiredHeight={256}
                requiredWidth={256}
                saveImage={(imageFile) => {callBackFromImageEditor(imageFile)}}
            />

        {/*  =========== END MODAL image cropper =============*/}
        </div>
    );
};

export default withErrorHandler(Profile, axios);
