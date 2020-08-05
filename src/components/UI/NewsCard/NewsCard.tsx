import React from 'react';
import ReactPlayer from "react-player";
import dateFormat from 'dateformat';
import "./NewsCard.scss";
import {useSelector} from "react-redux";
import {AppState} from "../../../store/configureStore";
import {TKnowledge} from "../../../store/types/knowledge";

interface IProps {
    knowledge: TKnowledge;
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
    let creatorDetails = useSelector((state: AppState) => {
        if (state.auth.userDetailsById) {
            return state.auth.userDetailsById[props.knowledge.createdBy];
        }
    });
    let userImageUrl = require("../../../assets/images/avatar.png");
    if (creatorDetails && creatorDetails.imageUrl) {
        userImageUrl = creatorDetails.imageUrl;
    }

    let typeBadgeClass = 'badge badge-primary text-uppercase font-weight-bold py-1 px-2 mr-2 rounded-0';

    if (props.knowledge.type === 'post') {
        typeBadgeClass =  'badge badge-danger text-uppercase font-weight-light py-1 px-2 mr-2 rounded-0';
    }
    if (props.knowledge.type === 'publication') {
        typeBadgeClass = 'badge badge-secondary text-uppercase font-weight-light py-1 px-2 mr-2 rounded-0';
    }
    if (props.knowledge.type === 'project') {
        typeBadgeClass = 'badge badge-warning text-uppercase font-weight-light py-1 px-2 mr-2 rounded-0';
    }

    return (
            <div className="card newsCardContainer mb-3" style={{ maxWidth: 540 }} onClick={() => props.cardClicked(props.knowledge._id)}>
                <div className="row no-gutters">
                    <div className="col-12">
                        {
                            props.knowledge.knowledgeFileType === 'video' && (
                                <div className='player-wrapper'>
                                    <ReactPlayer
                                        url={props.knowledge.knowledgeFile}
                                        className='react-player'
                                        width='100%'
                                        height='100%'
                                        onError={(e) => console.log(e)}
                                    />
                                </div>
                            )
                        }

                        {
                            props.knowledge.knowledgeFileType === 'image' && (
                                <img
                                    src={props.knowledge.knowledgeFile}
                                    className="card-img-top"
                                    alt="..."
                                />
                            )
                        }
                        {
                            props.knowledge.knowledgeFileType === 'other' && (
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
                                <span className={typeBadgeClass}>{props.knowledge.type}</span>
                                <small className="text-muted ml-2">
                                   | &nbsp; &nbsp; {dateFormat(new Date(props.knowledge.createdAt), 'mmm  dd, yyyy' )}
                                </small>
                            </p>
                            <h5 className="card-title text-truncate">{props.knowledge.title}</h5>
                            <p className="card-text lineClamp-four">
                                {props.knowledge.description}
                            </p>
                        </div>
                        <div className="p-3 d-flex justify-content-between align-items-center">
                            <div>
                                <img src={userImageUrl} alt="..." className="rounded-circle" style={{height: 28, width: 28}} />
                                <small className="text-muted ml-1 text-nowrap">{creatorDetails ? creatorDetails.firstName : undefined} {creatorDetails ? creatorDetails.lastName : undefined}</small>
                            </div>
                            <div>
                                <span className='text-muted mr-3'>
                                    <i  className='icons icon-bubbles mr-1'/>{props.knowledge.comments.length}
                                </span>
                                <span className='text-muted'>
                                    <i className='icons icon-heart mr-1'/>{props.knowledge.likes.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default NewsCard;
