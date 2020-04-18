import React from 'react';
import { connect } from "react-redux";
import Input from '../../UI/Input/Input';
import Modal from "../../UI/Modal/Modal";
import { updateObject, checkValidity } from '../../../shared/utility';
import "./CreateKnowledgeForm.scss";
import {AppState} from "../../../store/configureStore";
import {ThunkDispatch} from "redux-thunk";
import {AuthActions} from "../../../store/types/authActionTypes";
import ImageCropper from "../../UI/ImageCropper/ImageCropper";
import {showScrollbar, hideScrollBar} from "../../../hoc/scrollLock/scrollLock";
import * as actions from "../../../store/actions";
// import {uploadFile} from "../../../shared/axios";
import Dropdown from "react-bootstrap/Dropdown";
import ReactPlayer from "react-player";
interface IProps {

}

export interface input {
    elementType: string;
    elementConfig: {
        type: string;
        label: string;
    };
    value: any;
    validation: {
        required?: boolean;
        isEmail?: boolean;
        minLength?: number;
        maxLength?: number;
        isNumeric?: boolean;
        isPhoneOrFaxNumber?: boolean;
        isImageTypeValid?: boolean;
    };
    valid: boolean;
    touched: boolean;
    autoFocus: boolean;
    placeholder: string;
}

export interface SelectInput {
    elementType: string,
    elementConfig: {
        label: string;
        options: any[];
    },
    value: string,
    validation: {
        required?: boolean;
    },
    valid: boolean,
    touched: boolean,
    autoFocus: boolean
}

type IState = {
    createKnowledgeForm: {
        title: input;
        description: input;
        type: SelectInput;
        status: SelectInput;
        affiliations: input;
        lookingFor: input;
        members: input;
        knowledgeFile: input;
    },
    formIsValid: boolean,
    affiliations: string,
    lookingFor: string,
    members: string,
    showImageCropper: boolean,
    tempFile: any,
    tempFileType: string,
    errorMsg: string,
    showUploadLinkModal: boolean
};

const initialState = {
    createKnowledgeForm: {
        title: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Title*',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            autoFocus: false,
            placeholder: 'Title'
        },
        description: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                label: 'Description*',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            autoFocus: false,
            placeholder: 'Description'
        },
        type: {
            elementType: 'select',
            elementConfig: {
                label: 'Type*',
                options: [
                    {value: '', displayValue: 'Select a type'},
                    {value: 'pitch', displayValue: 'Pitch'},
                    {value: 'publication', displayValue: 'Publication'},
                    {value: 'project', displayValue: 'Project'},
                    {value: 'post', displayValue: 'Post'},
                ]
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            autoFocus: false
        },
        status: {
            elementType: 'select',
            elementConfig: {
                label: 'Status*',
                options: [
                    {value: '', displayValue: 'Select a status'},
                    {value: 'initial', displayValue: 'Initial'},
                    {value: 'initial funded', displayValue: 'Initial funded'},
                    {value: 'self funded', displayValue: 'Self funded'},
                    {value: 'fully funded', displayValue: 'Fully funded'},
                ]
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            autoFocus: false
        },
        affiliations: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Affiliation*',
            },
            value: [],
            validation: {
                required: false,
            },
            valid: false,
            touched: false,
            autoFocus: false,
            placeholder: 'Affiliation'
        },
        lookingFor: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'LookingFor*',
            },
            value: [],
            validation: {
                required: false,
            },
            valid: false,
            touched: false,
            autoFocus: false,
            placeholder: 'LookingFor'
        },
        members: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Members*',
            },
            value: [],
            validation: {
                required: false,
            },
            valid: false,
            touched: false,
            autoFocus: false,
            placeholder: 'Members'
        },
        knowledgeFile: {
            elementType: 'input',
            elementConfig: {
                type: 'file',
                label: 'Upload File',
            },
            value: '',
            validation: {
                required: false,
            },
            valid: false,
            touched: false,
            autoFocus: false,
            placeholder: 'Upload File'
        },

    },
    formIsValid: false,
    affiliations: '',
    lookingFor: '',
    members: '',
    showImageCropper: false,
    tempFile: null,
    tempFileType: '',
    errorMsg: '',
    showUploadLinkModal: false
};

type Props = LinkDispatchProps & LinkStateProps & IProps;

class CreateKnowledgeForm extends React.Component<Props, IState> {
    state: Readonly<IState> = initialState;
    fileUploadInputElement: HTMLInputElement | null | undefined;


    inputChangedHandler = (inputValue: any, inputIdentifier: any, isArrayValueDelete?: boolean) => {
        let value = inputValue.trim();
        if (inputIdentifier === 'affiliations' || inputIdentifier === 'lookingFor' || inputIdentifier === 'members') {

            if (isArrayValueDelete) {
                // @ts-ignore
                value = this.state.createKnowledgeForm[inputIdentifier].value.filter((item: string) =>  item !== value)
            } else {
                // ===== duplicate check
                // @ts-ignore
                if (this.state.createKnowledgeForm[inputIdentifier].value.includes(value)) {
                    return;
                }
                // @ts-ignore
                value = [...this.state.createKnowledgeForm[inputIdentifier].value, value];
            }
        }
        // @ts-ignore
        const updatedFormElement = updateObject(this.state.createKnowledgeForm[inputIdentifier], {
            value: value,
            // @ts-ignore
            valid: checkValidity(value, this.state.createKnowledgeForm[inputIdentifier].validation),
            touched: true
        });
        const updatedForm = updateObject(this.state.createKnowledgeForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            if (updatedForm.hasOwnProperty(inputIdentifier)) {
                formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
            }
        }
        this.setState({
            createKnowledgeForm: updatedForm,
            formIsValid: formIsValid
        });
    };

    addAffiliation = () => {
        if (this.state.affiliations.trim() === '') {
            return;
        }
        this.inputChangedHandler(this.state.affiliations, 'affiliations');
        this.setState({affiliations: ''});
    };

    addLookingFor = () => {
        if (this.state.lookingFor.trim() === '') {
            return;
        }
        this.inputChangedHandler(this.state.lookingFor, 'lookingFor');
        this.setState({lookingFor: ''});
    };

    addMembers = () => {
        if (this.state.members.trim() === '') {
            return;
        }
        this.inputChangedHandler(this.state.members, 'members');
        this.setState({members: ''});
    };

    showImageCropperView = () => {
        this.setState({showImageCropper: true});
    };

    hideImageCropperView = () => {
        this.setState({showImageCropper: false});
    };

    callBackFromImageEditor = (imageFile: any) => {

        console.log(imageFile);
        this.setState({tempFile: imageFile, tempFileType: 'image'});

        // let fileName = imageFile.name +"-profilePic(" + Date.now() + ")";
        // if (this.state.createKnowledgeForm.knowledgeFile.value !== '') {
        //     this.props.onDeleteFile(this.state.createKnowledgeForm.knowledgeFile.value);
        // }
        // uploadFile(imageFile, fileName, imageFile.type, (err: any, result: any) => {
        //     if (err) {
        //         console.log(err)
        //     } else {
        //         console.log(result);
        //         this.inputChangedHandler(result, 'knowledgeFile');
        //         let data = {
        //             imageUrl: result
        //         };
        //         this.props.onUploadFile(data);
        //     }
        // });
    };
    videoFileChangeHandler = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
        let file = event.target.files[0];
        console.log(file);

        // console.log(URL.createObjectURL(file));
        if (file !== null || true) {
            console.log(ReactPlayer.canPlay(URL.createObjectURL(file)));
            if (ReactPlayer.canPlay(URL.createObjectURL(file))) {
                this.setState({tempFile: file, tempFileType: 'video'});
            } else {
                this.setState({
                    errorMsg: 'File type not supported.',
                });
                setTimeout(() => {
                    this.setState({ errorMsg: '' });
                }, 1500);
            }
        }
    };

    cancelVideoUpload = (event: any) => {
        event.target.value = null;
    };

    videoLinkChangeHandler = () => {
        // hide the modal
        this.hideUploadLinkModalView();
        // hide any previous video file preview
        this.setState({
            tempFileType: '',
            tempFile: null
        });
        // check for valid url
        let url = this.state.createKnowledgeForm.knowledgeFile.value;
        if (url.trim() === '') {
            return;
        }
        if (!url.includes('//')) {
            url = 'https://' + url;
        }
        // if the link is not working we remove it from state and show error msg
        if (!ReactPlayer.canPlay(url)) {
            const updatedFormElement = updateObject(this.state.createKnowledgeForm.knowledgeFile, {
                value: '',
                valid: false,
                touched: true
            });
            const updatedForm = updateObject(this.state.createKnowledgeForm, {
                knowledgeFile: updatedFormElement
            });
            this.setState({
                createKnowledgeForm: updatedForm,
                formIsValid: false,
                errorMsg: 'Video not supported.',
            });
            setTimeout(() => {
                this.setState({ errorMsg: '' });
            }, 1500);
        }

    };

    showUploadLinkModalView = () => {
        this.setState({showUploadLinkModal: true});
    };

    hideUploadLinkModalView = () => {
        this.setState({showUploadLinkModal: false});
    };

    render() {
        let fileInput = (
            <input
                id="myInput"
                type="file"
                ref={ref => (this.fileUploadInputElement = ref)}
                style={{ display: 'none', maxWidth: '100%' }}
                onChange={e => this.videoFileChangeHandler(e)}
                onClick={event => {this.cancelVideoUpload(event);}}
            />
        );
        return (

            <div className='createKnowledgeFormContainer'>
                <div className="inputElementsWrapper border rounded shadow-sm">
                    {/* ============================================= */}
                    {/* ================== title ==================== */}
                    {/* ============================================= */}
                    <Input
                        elementType={this.state.createKnowledgeForm.title.elementType}
                        elementConfig={this.state.createKnowledgeForm.title.elementConfig}
                        value={this.state.createKnowledgeForm.title.value}
                        changed={(event) => this.inputChangedHandler(event.target.value, 'title')}
                        invalid={!this.state.createKnowledgeForm.title.valid}
                        shouldValidate={this.state.createKnowledgeForm.title.validation}
                        touched={this.state.createKnowledgeForm.title.touched}
                        autoFocus={this.state.createKnowledgeForm.title.autoFocus}
                        placeholder={this.state.createKnowledgeForm.title.placeholder}
                    />
                    {/* ============================================= */}
                    {/* ============== description ================== */}
                    {/* ============================================= */}

                    <Input
                        elementType={this.state.createKnowledgeForm.description.elementType}
                        elementConfig={this.state.createKnowledgeForm.description.elementConfig}
                        value={this.state.createKnowledgeForm.description.value}
                        changed={(event) => this.inputChangedHandler(event.target.value, 'description')}
                        invalid={!this.state.createKnowledgeForm.description.valid}
                        shouldValidate={this.state.createKnowledgeForm.description.validation}
                        touched={this.state.createKnowledgeForm.description.touched}
                        autoFocus={this.state.createKnowledgeForm.description.autoFocus}
                        placeholder={this.state.createKnowledgeForm.description.placeholder}
                    />
                    {/* ============================================= */}
                    {/* ================= type ======================  */}
                    {/* ============================================= */}

                    <Input
                        elementType={this.state.createKnowledgeForm.type.elementType}
                        elementConfig={this.state.createKnowledgeForm.type.elementConfig}
                        value={this.state.createKnowledgeForm.type.value}
                        changed={(event) => this.inputChangedHandler(event.target.value, 'type')}
                        invalid={!this.state.createKnowledgeForm.type.valid}
                        shouldValidate={this.state.createKnowledgeForm.type.validation}
                        touched={this.state.createKnowledgeForm.type.touched}
                        autoFocus={this.state.createKnowledgeForm.type.autoFocus}
                    />
                    {/* ============================================= */}
                    {/* ================= status ====================  */}
                    {/* ============================================= */}
                    <Input
                        elementType={this.state.createKnowledgeForm.status.elementType}
                        elementConfig={this.state.createKnowledgeForm.status.elementConfig}
                        value={this.state.createKnowledgeForm.status.value}
                        changed={(event) => this.inputChangedHandler(event.target.value, 'status')}
                        invalid={!this.state.createKnowledgeForm.status.valid}
                        shouldValidate={this.state.createKnowledgeForm.status.validation}
                        touched={this.state.createKnowledgeForm.status.touched}
                        autoFocus={this.state.createKnowledgeForm.status.autoFocus}
                    />
                    {/* ============================================= */}
                    {/* ================ Affiliation ================ */}
                    {/* ============================================= */}

                    <div className='Input'>
                        <label className="Label">Affiliations</label>
                        <div className="formGroup">
                            <input
                                className='InputElement'
                                type='text'
                                placeholder='Add affiliation'
                                value={this.state.affiliations}
                                onChange={(event) => this.setState({affiliations: event.target.value})}
                            />
                            <button
                                className='btn btn-primary'
                                onClick={this.addAffiliation}
                            >
                                <i className='icons icon-plus' />
                            </button>
                        </div>
                        <small className='text-muted'>Add your entry by clicking the <i className='icons icon-plus' /> button</small>
                    </div>
                    <div className='tagsWrapper'>
                        {
                            this.state.createKnowledgeForm.affiliations.value.map((value: any, index: any) => {
                                return (
                                    <span className="tag bg-light text-primary border" key={index}>
                                      <span className='mr-2'>{value}</span>
                                      <i
                                          className="icons icon-close text-danger"
                                          onClick={() => {
                                              this.inputChangedHandler(value, 'affiliations', true)}}
                                      />
                                   </span>
                                );
                            })
                        }
                    </div>
                    {/* ============================================= */}
                    {/* =============== LookingFor ================== */}
                    {/* ============================================= */}
                    <div className='Input'>
                        <label className="Label">Looking for</label>
                        <div className="formGroup">
                            <input
                                className='InputElement'
                                type='text'
                                placeholder='Software developer, Marketing expert'
                                value={this.state.lookingFor}
                                onChange={(event) => this.setState({lookingFor: event.target.value})}
                            />
                            <button
                                className='btn btn-primary'
                                onClick={this.addLookingFor}
                            >
                                <i className='icons icon-plus' />
                            </button>
                        </div>
                        <small className='text-muted'>Add your entry by clicking the <i className='icons icon-plus' /> button</small>
                    </div>
                    <div className='tagsWrapper'>
                        {
                            this.state.createKnowledgeForm.lookingFor.value.map((value: any, index: any) => {
                                return (
                                    <span className="tag bg-light text-primary border" key={index}>
                                      <span className='mr-2'>{value}</span>
                                      <i
                                          className="icons icon-close text-danger"
                                          onClick={() => {
                                              this.inputChangedHandler(value, 'lookingFor', true)}}
                                      />
                                   </span>
                                );
                            })
                        }
                    </div>
                    {/* ============================================= */}
                    {/* ================== members ================== */}
                    {/* ============================================= */}

                    <div className='Input'>
                        <label className="Label">Members</label>
                        <div className="formGroup">
                            <input
                                className='InputElement'
                                type='text'
                                placeholder='Email or Name'
                                value={this.state.members}
                                onChange={(event) => this.setState({members: event.target.value})}
                            />
                            <button
                                className='btn btn-primary'
                                onClick={this.addMembers}
                            ><i className='icons icon-plus' />
                            </button>
                        </div>
                        <small className='text-muted'>Add your entry by clicking the <i className='icons icon-plus' /> button</small>
                    </div>
                    <div className='tagsWrapper'>
                        {
                            this.state.createKnowledgeForm.members.value.map((value: any, index: any) => {
                                return (
                                    <span className="tag bg-light text-primary border" key={index}>
                                      <span className='mr-2'>{value}</span>
                                      <i
                                          className="icons icon-close text-danger"
                                          onClick={() => {
                                              this.inputChangedHandler(value, 'members', true)}}
                                      />
                                   </span>
                                );
                            })
                        }
                    </div>
                    {/* ============================================= */}
                    {/* ============== Knowledge file =============== */}
                    {/* ============================================= */}
                    <div className='Input'>
                        <label className="Label">Upload file</label>
                        <div className="fileTypeSelectionContainer d-flex">

                            <button
                                className='btn btn-danger mr-2'
                                onClick={() => {this.showImageCropperView(); hideScrollBar();}}
                            >
                                <i className='icons icon-camera' />

                            </button>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    <i className='icons icon-camrecorder mr-2'/>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => {
                                        this.showUploadLinkModalView()
                                    }}> <i className='icons icon-link' /> Url</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        // @ts-ignore
                                        this.fileUploadInputElement.click();}}>
                                        <i className='icons icon-doc' /> file
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    {/* =============================================== */}
                    {/* =============  MODAL Image cropper ============ */}
                    {/* =============================================== */}
                    <ImageCropper
                        show={this.state.showImageCropper}
                        hideDropZoneModal={() => {this.hideImageCropperView(); showScrollbar();}}
                        aspectRatio={1} // 16/9 if requires rectangle
                        requiredHeight={256}
                        requiredWidth={256}
                        saveImage={(imageFile) => {this.callBackFromImageEditor(imageFile)}}
                    />

                    {/*  =========== END MODAL image cropper =============*/}

                    {/* ============================================= */}
                    {/* ============== upload preview =============== */}
                    {/* ============================================= */}
                    {/* The hidden input field for upload file to work */}
                    {fileInput}
                    <div className='uploadPreviewWrapper d-flex justify-content-center align-content-center'>
                        {/* ==== Image preview ==== */}
                        {
                            this.state.tempFile !== null && this.state.tempFileType === "image" && (
                                <img src={URL.createObjectURL(this.state.tempFile)} alt=""/>
                            )
                        }
                        {/* ==== Video file preview ==== */}
                        {
                            this.state.tempFile !== null && this.state.tempFileType === 'video' && (
                                <ReactPlayer
                                    url={URL.createObjectURL(this.state.tempFile)}
                                    controls
                                    width='100%'
                                    height='100%'
                                    onError={(e) => console.log(e)}
                                />
                            )
                        }
                        {/* ===== Video link preview ===== */}
                        {
                            this.state.createKnowledgeForm.knowledgeFile.value !== '' && (
                                <ReactPlayer
                                    url={this.state.createKnowledgeForm.knowledgeFile.value}
                                    controls
                                    width='100%'
                                    height='100%'
                                    onError={(e) => console.log(e)}
                                />
                            )
                        }
                        {/* ===== Error message ======== */}
                        {
                            this.state.errorMsg !== '' && (
                                <small className='text-danger'>{this.state.errorMsg}</small>
                            )
                        }

                    </div>
                    {/* ============================================= */}
                    {/* ============== video link modal ============= */}
                    {/* ============================================= */}
                    <Modal
                        show={this.state.showUploadLinkModal}
                        modalClosed={this.hideUploadLinkModalView}
                    >
                        <div className='d-flex justify-content-center align-content-center flex-column p-4'>
                            <i className='icons icon-link text-info text-center' style={{fontSize: 30}}/>
                            <small className='m-4 text-center'>Enter url of your video</small>
                            <input
                                className='InputElement'
                                type='text'
                                placeholder='Link of your video i.e youtube'
                                value={this.state.createKnowledgeForm.knowledgeFile.value}
                                onChange={(event) => {this.inputChangedHandler(event.target.value, 'knowledgeFile', true)}}
                            />
                            <div className='d-flex justify-content-center mt-4'>
                                <button type="button" className="btn btn-outline-danger mr-2 w-50" onClick={this.hideUploadLinkModalView}>CANCEL</button>
                                <button type="button" className="btn btn-primary w-50" onClick={this.videoLinkChangeHandler}>SAVE</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>

        );
    }
}

interface LinkStateProps {

}
interface LinkDispatchProps {
    onUploadFile: (data: any) => void;
    onDeleteFile: (imageUrl: string) => void;
}
const mapStateToProps = (state: AppState): LinkStateProps => ({

});
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AuthActions>): LinkDispatchProps => ({
    onUploadFile: (data) => dispatch(actions.saveUserData(data)),
    onDeleteFile: (imageUrl) => dispatch(actions.deleteFile(imageUrl.substring(imageUrl.lastIndexOf('/') + 1)))
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateKnowledgeForm);
