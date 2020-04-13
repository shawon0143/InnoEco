import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Profile.scss';
import { AppState } from '../../store/configureStore';
import ProfileInfo from "../../components/Profile/ProfileInfo/ProfileInfo";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import ImageCropper from "../../components/UI/ImageCropper/ImageCropper";
import {showScrollbar, hideScrollBar} from "../../hoc/scrollLock/scrollLock";
import {uploadFile} from "../../shared/axios";


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

    // save file
    const callBackFromImageEditor = (imageFile: any) => {
        let fileName = imageFile.name +"-profilePic(" + Date.now() + ")";
        if (userProfile.imageUrl !== '') {
            dispatch(actions.deleteUserProfileImage(userProfile.imageUrl.substring(userProfile.imageUrl.lastIndexOf('/') + 1)))
        }
        uploadFile(imageFile, fileName, imageFile.type, (err: any, result: any) => {
            if (err) {
                console.log(err)
            } else {
                console.log(result);
                let data = {
                    imageUrl: result
                };
                dispatch(actions.saveUserData(data));
                setTempPic(result);
            }
        });
    };
    return (
        <div className="container profileContainer topNavMargin p-3">
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
                                <ul className="list-inline text-center mt-auto mb-5">
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
        {/*  ============  MODAL ============ */}

            <ImageCropper
                show={showCropperModal}
                hideDropZoneModal={() => {setShowCropperModal(false); showScrollbar();}}
                aspectRatio={1} // 16/9 if requires rectangle
                requiredHeight={256}
                requiredWidth={256}
                saveImage={(imageFile) => {callBackFromImageEditor(imageFile)}}
            />

        {/*  =========== END MODAL =============*/}
        </div>
    );
};

export default Profile;
