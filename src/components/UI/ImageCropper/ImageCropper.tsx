// we have used the react-cropper package for this component
// https://github.com/fengyuanchen/cropperjs
import * as React from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { NavLink } from 'react-router-dom';
import './ImageCropper.scss';
// local components import
import Backdrop from "../../UI/Backdrop/Backdrop";
import { checkValidity } from '../../../shared/utility';
// import Modal from '../Modal/Modal';

interface IProps {
    show: boolean;
    hideDropZoneModal: () => void;
    aspectRatio: number;
    requiredHeight: number;
    requiredWidth: number;
    saveImage: (imageFile: any) => void;
}

type State = {
    previewImageSrc: string;
    newImage: string;
    showCropper: boolean;
    errorMsg: string;
    selectedImageFileType: string;
    imageDraggedOver: boolean;
};

class ImageCropper extends React.Component<IProps, State> {
    private myRef: any = React.createRef();

    imageUploadInputElement: HTMLInputElement | null | undefined;
    state: Readonly<State> = {
        previewImageSrc: '',
        showCropper: false,
        errorMsg: '',
        newImage: '',
        selectedImageFileType: '',
        imageDraggedOver: false,
    };
    _crop() {
        this.setState({
            previewImageSrc: this.myRef.current['cropper']
                .getCroppedCanvas({
                    width: this.props.requiredWidth,
                    height: this.props.requiredHeight,
                })
                .toDataURL(this.state.selectedImageFileType),
        });
    }

    imageChangeHandler = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
        this.setState({ imageDraggedOver: false });

        let file;

        // first we check if it was a drop event or not
        if (
            event.dataTransfer !== undefined &&
            event.dataTransfer.files.length > 0
        ) {
            file = event.dataTransfer.files[0];
        } else {
            file = event.target.files[0];
        }

        // console.log(file);
        if (file !== null || true) {
            //validity check [file type]
            let isImageValid = checkValidity(file, { isImageTypeValid: true });
            // if image is not valid =======
            if (!isImageValid) {
                this.setState({
                    errorMsg: 'Allowed file types are .png, .jpg, .jpeg',
                });
                setTimeout(() => {
                    this.setState({ errorMsg: '' });
                }, 1500);
                return;
            } else {
                this.setState({
                    newImage: URL.createObjectURL(file),
                    showCropper: true,
                    previewImageSrc: '',
                    errorMsg: '',
                    selectedImageFileType: file.type,
                });
                setTimeout(() => {
                    this._crop();
                }, 300);
            }
        }
    };

    cancelImageUpload = (event: any) => {
        event.target.value = null;
    };

    resetEditor = () => {
        this.myRef.current['cropper'].reset();
        console.log(this.myRef.current['cropper']);
        this._crop();
        // this.setState({
        //     previewImageSrc: this.myRef.current['cropper']
        //         .getCroppedCanvas()
        //         .toDataURL(this.state.selectedImageFileType),
        // });
    };

    zoomIn = () => {
        this.myRef.current['cropper'].zoom(0.1);
    };

    zoomOut = () => {
        this.myRef.current['cropper'].zoom(-0.1);
    };

    resetImageCropper = () => {
        this.setState({
            newImage: '',
            showCropper: false,
            previewImageSrc: '',
        });
        this.props.hideDropZoneModal();
    };

    saveChanges = () => {
        this.resetImageCropper();
        // console.log(this.state.previewImageSrc);
        let imageFile = this.dataURLtoFile(
            this.state.previewImageSrc,
            'imageFile',
        );
        // console.log(imageFile);
        this.props.saveImage(imageFile);
    };

    // helper function: generate a new file from base64 String
    dataURLtoFile = (dataURL: string, fileName: string) => {
        const arr: any = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n) {
            u8arr[n - 1] = bstr.charCodeAt(n - 1);
            n -= 1; // to make eslint happy
        }
        return new File([u8arr], fileName, { type: mime });
    };
    onDragOver = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ imageDraggedOver: true });
    };

    onDrop = (event: any) => {
        event.preventDefault();
        // console.log(event.dataTransfer.files);
    };

    onDragLeave = (event: any) => {
        event.preventDefault();
        this.setState({ imageDraggedOver: false });
    };

    render() {
        let imageFileInput = (
            <input
                id="myInput"
                type="file"
                ref={ref => (this.imageUploadInputElement = ref)}
                style={{ display: 'none', maxWidth: '100%' }}
                onChange={e => this.imageChangeHandler(e)}
                onClick={event => {
                    this.cancelImageUpload(event);
                }}
            />
        );

        let invalidFileTypeErrorMsg =
            this.state.errorMsg !== '' ? (
                <div>{this.state.errorMsg}</div>
            ) : null;

        return (
            <React.Fragment>
                <Backdrop
                    show={this.props.show}
                    clicked={() => this.resetImageCropper()}
                />

                    <div
                        className="customModal"
                        style={{
                            background: this.state.imageDraggedOver
                                ? '#f0f0f0'
                                : '',
                            border: this.state.imageDraggedOver
                                ? '3px dashed #ccc'
                                : '',
                            transform: this.props.show
                                ? "translateY(0)"
                                : "translateY(-100vh)",
                            opacity: this.props.show ? 1 : 0
                        }}
                        onDragOver={event => this.onDragOver(event)}
                        onDrop={event => this.imageChangeHandler(event)}
                        onDragLeave={event => this.onDragLeave(event)}
                    >
                        <div className=" imageCropperContainer container h-100 w-100">
                            {!this.state.showCropper ? (
                                <div className="flexWrapperColumn">
                                    {/* ============= Show Drop zone ================ */}
                                    <i className="icons icon-cloud-upload text-muted" />
                                    <div className="text-muted">
                                        Drop file to upload or{' '}
                                        <NavLink
                                            to="#"
                                            replace
                                            onClick={() => {
                                                // @ts-ignore
                                                this.imageUploadInputElement.click();
                                            }}
                                        >
                                            {' '}
                                            browse
                                        </NavLink>
                                    </div>
                                    {/* hidden input field */}
                                    {imageFileInput}
                                    {/* show error message*/}
                                    {invalidFileTypeErrorMsg}
                                </div>
                            ) : (
                                <React.Fragment>
                                    {/* ============= Show cropper and preview ===================*/}
                                    {/*<div>*/}
                                        <Cropper
                                            ref={this.myRef}
                                            src={this.state.newImage}
                                            style={{
                                                height: 350,
                                                width: '80%',
                                            }}
                                            // Cropper.js options
                                            aspectRatio={this.props.aspectRatio}
                                            guides={true}
                                            cropend={this._crop.bind(this)}
                                            zoom={this._crop.bind(this)}
                                            autoCropArea={1}
                                            viewMode={1}
                                            dragMode="move"
                                        />
                                    {/*</div>*/}
                                    <div className="flexWrapperColumn">
                                        {this.state.previewImageSrc !== '' ? (
                                            <React.Fragment>
                                                <img
                                                    src={
                                                        this.state
                                                            .previewImageSrc
                                                    }
                                                    alt=""
                                                    className="previewBox m-1"
                                                />
                                                <small className="text-muted">
                                                    Preview
                                                </small>
                                            </React.Fragment>
                                        ) : (
                                            <div className="noPreviewWrapper">
                                                <h5 className="text-muted">
                                                    Loading preview ....
                                                </h5>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flexWrapperRow">
                                        <i
                                            className='icons icon-close cropperControlIcon'
                                            onClick={() => this.resetImageCropper()}
                                        />
                                        <i
                                            className="icons icon-camera cropperControlIcon"
                                            onClick={() => {
                                                // @ts-ignore
                                                this.imageUploadInputElement.click();
                                            }}
                                        />
                                        {/* The hidden input field for upload file to work */}
                                        {imageFileInput}

                                        <i
                                            className="icons icon-reload cropperControlIcon"
                                            onClick={() => this.resetEditor()}
                                        />

                                        <i
                                            className="icons icon-magnifier-add cropperControlIcon"
                                            onClick={() => this.zoomIn()}
                                        />

                                        <i
                                            className="icons icon-magnifier-remove cropperControlIcon"
                                            onClick={() => this.zoomOut()}
                                        />
                                        {this.state.previewImageSrc !== '' ? (
                                            <i
                                                className="icons icon-check cropperControlIcon"
                                                onClick={() =>
                                                    this.saveChanges()
                                                }
                                            />
                                        ) : null}
                                    </div>
                                    <div className="flexWrapperRow">
                                        {/* show error message*/}
                                        {invalidFileTypeErrorMsg}
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}

export default ImageCropper;
