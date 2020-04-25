import React from 'react';
import ReactPlayer from "react-player";
import dateFormat from 'dateformat';
import "./NewsCard.scss";
import {TCreatedBy, TKnowledgeType} from "../../../store/types/knowledge";

interface IProps {
    id: string;
    fileUrl: string;
    fileType: string;
    title: string;
    description: string;
    createdBy: TCreatedBy;
    noOfLikes: number;
    noOfComments: number;
    createdAt: Date;
    type: TKnowledgeType;
    cardClicked: (id: string) => void;
}

dateFormat.i18n = {
    dayNames: [
        'Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam',
        'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'
    ],
    monthNames: [
        'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez',
        'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ],
    timeNames: [
        'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ]
};

const NewsCard: React.FC<IProps> = (props: IProps) => {
    let userImageUrl = require("../../../assets/images/avatar.png");
    if (props.createdBy.imageUrl) {
        userImageUrl = props.createdBy.imageUrl;
    }

    let typeBadgeClass = 'badge badge-primary text-uppercase font-weight-bold py-1 px-2 mr-2 rounded-0';

    if (props.type === 'post') {
        typeBadgeClass =  'badge badge-danger text-uppercase font-weight-light py-1 px-2 mr-2 rounded-0';
    }
    if (props.type === 'publication') {
        typeBadgeClass = 'badge badge-secondary text-uppercase font-weight-light py-1 px-2 mr-2 rounded-0';
    }
    if (props.type === 'project') {
        typeBadgeClass = 'badge badge-warning text-uppercase font-weight-light py-1 px-2 mr-2 rounded-0';
    }

    return (
            <div className="card newsCardContainer mb-3" style={{ maxWidth: 540 }} onClick={() => props.cardClicked(props.id)}>
                <div className="row no-gutters">
                    <div className="col-12">
                        {
                            props.fileType === 'video' && (
                                <div className='player-wrapper'>
                                    <ReactPlayer
                                        url={props.fileUrl}
                                        className='react-player'
                                        width='100%'
                                        height='100%'
                                        onError={(e) => console.log(e)}
                                    />
                                </div>
                            )
                        }

                        {
                            props.fileType === 'image' && (
                                <img
                                    src={props.fileUrl}
                                    className="card-img-top"
                                    alt="..."
                                />
                            )
                        }
                        {
                            props.fileType === 'other' && (
                                <img
                                    src={require('../../../assets/images/tempDocPlaceholder.jpg')}
                                    alt="pdf"
                                    className="card-img-top"
                                />
                            )
                        }

                    </div>
                    <div className="col-12">
                        <div className="card-body">
                            <p className="card-text">
                                <span className={typeBadgeClass}>{props.type}</span>
                                <small className="text-muted ml-2">
                                   | &nbsp; &nbsp; {dateFormat(props.createdAt, 'mmm  dd, yyyy' )}
                                </small>
                            </p>
                            <h5 className="card-title text-truncate">{props.title}</h5>
                            <p className="card-text lineClamp-four">
                                {props.description}
                            </p>
                        </div>
                        <div className="p-3 d-flex justify-content-between align-items-center">
                            <div>
                                <img src={userImageUrl} alt="..." className="rounded-circle" style={{height: 28, width: 28}} />
                                <small className="text-muted ml-1">{props.createdBy.firstName} {props.createdBy.lastName}</small>
                            </div>
                            <div>
                                <span className='text-muted mr-3'>
                                    <i  className='icons icon-bubbles mr-1'/>{props.noOfComments}
                                </span>
                                <span className='text-muted'>
                                    <i className='icons icon-like mr-1'/>{props.noOfLikes}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default NewsCard;
