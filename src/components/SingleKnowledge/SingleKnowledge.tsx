import React, {useState} from 'react';
import {TComment, TKnowledge} from "../../store/types/knowledge";
import "./SingleKnowledge.scss";
import dateFormat from "dateformat";
import ReactPlayer from "react-player";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/configureStore";
import {useHistory} from "react-router-dom";
import * as actions from "../../store/actions/index";


interface IProps {
    knowledge: TKnowledge
}


const SingleKnowledge:React.FC<IProps> = (props:IProps) => {
    const isLoggedIn = useSelector((state: AppState) => {
        return (state.auth.token !== '' && !state.auth.loading);
    });
    let allUserDetails = useSelector((state: AppState) => state.auth.userDetailsById);
    let userId = useSelector((state: AppState) => state.auth.id);
    let history = useHistory();
    const dispatch = useDispatch();
    let [comment, setComment] = useState('');
    const addComment = (event: any) => {
        event.preventDefault();
        if (!isLoggedIn) {
            return;
        }
        let newComment = {
            details: comment,
            userId: userId,
            postedOn: new Date()
        };
        dispatch(actions.addNewComment(newComment, props.knowledge._id));
        setComment('');
    };
    let isUserLiked: boolean = false;
    for (let i = 0; i < props.knowledge.likes.length; i++) {
        if (props.knowledge.likes[i].userId === userId) {
            isUserLiked = true;
            break;
        }
    }
    console.log(isUserLiked);
    const addLike = () => {
        if (!isUserLiked) {
            let newLike = {
                userId: userId,
                likedOn: new Date()
            };
            dispatch(actions.addNewLike(newLike, props.knowledge._id));
        }
    };


    let avatar = require("../../../src/assets/images/avatar.png");
    let userImageUrl = avatar;
    if (allUserDetails[props.knowledge.createdBy].imageUrl) {
        userImageUrl = allUserDetails[props.knowledge.createdBy].imageUrl;
    }
    let allComments: any;
    allComments = props.knowledge.comments.map((item: TComment) => {

        return (
           <div className="media py-3" key={item._id}>
               <img src={allUserDetails[item.userId] && allUserDetails[item.userId].imageUrl !== '' ? allUserDetails[item.userId].imageUrl : avatar}
                    alt="..."
                    className="rounded-circle mr-4"
                    style={{height: 40, width: 40}}
               />
               <div className="media-body">
                   <h6 className="text-dark mb-0 font-weight-normal">
                       {allUserDetails[item.userId] ? allUserDetails[item.userId].firstName : undefined}
                       {allUserDetails[item.userId] ? allUserDetails[item.userId].lastName : undefined}
                   </h6>
                   <small className='text-muted'>{dateFormat(new Date(item.postedOn), 'mmm  dd, yyyy, hh:MM TT' )}</small>
                   <p className="text-secondary my-2">{item.details}</p>
               </div>
           </div>
       );
    });

    return (
        <div className='container singleKnowledgeContainer'>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className='text-center'>
                        {
                            props.knowledge.knowledgeFileType === 'video' && (
                                    <ReactPlayer
                                        url={props.knowledge.knowledgeFile}
                                        width='100%'
                                        className='mb-3'
                                        onError={(e) => console.log(e)}
                                    />
                            )
                        }

                        {
                            props.knowledge.knowledgeFileType === 'image' && (
                                <img
                                    src={props.knowledge.knowledgeFile}
                                    className="image-fluid mb-3 w-100"
                                    alt="..."
                                />
                            )
                        }
                        {
                            props.knowledge.knowledgeFileType === 'other' && (
                                <img
                                    src={require('../../../src/assets/images/tempDocPlaceholder.jpg')}
                                    alt="pdf"
                                    className="image-fluid mb-3"
                                />
                            )
                        }
                        <h2>{props.knowledge.title}</h2>
                    </div>
                    <hr/>
                    {
                        isLoggedIn && (
                            <div className='voteContainer d-flex flex-column justify-content-center align-items-center'>
                                <div
                                    className={`p-2 border d-flex flex-column justify-content-center rounded align-items-center ${isUserLiked ? 'voted' : null}`}
                                    onClick={addLike}
                                >
                                    <i  className='icons icon-heart' />
                                </div>
                            </div>
                        )
                    }

                    <div className="p-2 mb-2 d-flex justify-content-center align-items-center">
                        <div>
                            <small className="text-muted ml-2">{allUserDetails[props.knowledge.createdBy].firstName} {allUserDetails[props.knowledge.createdBy].lastName}
                                <span className="font-weight-light mx-3">·</span>
                                {dateFormat(new Date(props.knowledge.createdAt), 'mmm  dd, yyyy' )}
                            </small>
                        </div>
                    </div>
                    {/* ====== Description =========== */}
                    <p className='knowledgeDescription mb-5'>{props.knowledge.description}</p>
                    {/* ====== Affiliation =========== */}
                    <div className='mb-4'>
                        <h5 className='border-bottom'>Affiliations</h5>

                        {
                            props.knowledge.affiliation.map((item: string, index: number) => (
                                <h6 className='mr-2' key={index}><span className="badge badge-secondary">{item}</span></h6>
                            ))
                        }
                    </div>

                    {/* ====== Members ============== */}
                    <div className='mb-4'>
                        <h5 className='border-bottom'>Members</h5>
                        <div className='d-flex'>
                            {
                                props.knowledge.members.map((item: string, index: number) => (
                                    <h6 className='mr-2' key={index}><span className="badge badge-warning">{item}</span></h6>
                                ))
                            }
                        </div>
                    </div>
                    {/* ======= Looking for =========== */}
                    <div className='mb-4'>
                        <h5 className='border-bottom'>Looking for</h5>
                        <div className='d-flex'>
                            {
                                props.knowledge.lookingFor.map((item: string, index: number) => (
                                    <h6 className='mr-2' key={index}><span className="badge badge-info">{item}</span></h6>
                                ))
                            }
                        </div>
                    </div>

                    {/* ===== For PDF file download option ======= */}
                    {
                        props.knowledge.knowledgeFileType === 'other' && (
                            <div className='downloadFile p-2'>

                                <i className='icons icon-doc mr-2'/>
                                {
                                    props.knowledge.knowledgeFile
                                        .split('/')[3]
                                        .substring(0, props.knowledge.knowledgeFile
                                            .split('/')[3]
                                            .lastIndexOf('-')
                                        )
                                }
                                <a className='btn-link text-success ml-5' href={props.knowledge.knowledgeFile} download={props.knowledge.knowledgeFile} target='_blank' rel='noopener noreferrer'>
                                    Download
                                </a>
                            </div>
                        )
                    }
                    {/* ====== Comments ============== */}
                    <div className="commentsContainer border-top">
                        <div className='border-bottom p-3'>
                            <span className='text-muted mr-3'>
                                <i  className='icons icon-bubbles mr-1'/>{props.knowledge.comments.length} &nbsp; Comments
                            </span>
                                <span className='text-muted'>
                                <i className='icons icon-heart mr-1'/>{props.knowledge.likes.length} &nbsp; Votes
                            </span>
                        </div>
                        {allComments}
                        <form className='my-3'>
                            <textarea
                                className="InputElement mb-3"
                                placeholder='Write a comment...'
                                rows={4}
                                disabled={!isLoggedIn}
                                value={comment}
                                onChange={(event) => setComment(event.target.value)}
                            />
                            {
                                !isLoggedIn && (
                                    <React.Fragment>
                                       <button className='btn btn-danger btn-sm mr-2' onClick={() => history.push('/auth')}>Sign in</button>
                                        <small className='text-muted'>Sign in to write a comment or vote.</small>
                                    </React.Fragment>
                                )
                            }
                            {
                                isLoggedIn && (
                                    <button className='btn btn-success btn-sm mr-2' onClick={addComment}>Add comment</button>
                                )
                            }
                        </form>
                    </div>
                    {/* ======= Author details ======= */}
                    <div className='authorDetailsContainer'>
                        <h5 className='py-3 mb-5 border-bottom'>Contributor details</h5>
                        <div className="row justify-content-between">
                            <div className="col">
                                <div className="media">
                                    <img src={userImageUrl} alt="..." className="rounded-circle mr-4" style={{height: 80, width: 80}} />
                                    <div className="media-body">
                                        <h4 className="h5 text-dark font-weight-normal">{allUserDetails[props.knowledge.createdBy].firstName} {allUserDetails[props.knowledge.createdBy].lastName}</h4>
                                        <p className="text-secondary mb-4">I am an ambitious workaholic, but apart
                                            from that, pretty simple person. Whether it's branding, print, UI + UX I've got
                                            you covered. I strive to figure out the right solutions for your look to stand
                                            out amongst the rest.</p>
                                        {/*<button className="btn btn-outline-primary text-uppercase py-1 px-3"*/}
                                        {/*   >Author posts</button>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleKnowledge;
