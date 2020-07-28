import React from 'react';
import { TEvent } from '../../../store/types/event';
import './EventCard.scss';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../store/configureStore';
import { formatDateForEventCard } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';
import { sessionInfo } from '../../../shared/axios';

interface IProps {
    event: TEvent;
}

const EventCard:React.FC<IProps> = (props: IProps) => {
    const dispatch = useDispatch();
    const userEmail = sessionInfo().email;
    const isLoggedin = useSelector((state: AppState) => state.auth.token !== '');
    let isAlreadyRegistered: boolean = false;
    if (userEmail) {
        isAlreadyRegistered = props.event.members.includes(userEmail);
    }
    let date = formatDateForEventCard(new Date(props.event.eventDate));
    const onClickRegister = (eventId: string) => {

        if (userEmail) {
            dispatch(actions.registerEvent(userEmail, eventId));
        }
    };
    return (
        <div className='eventCardContainer'>
            <div className="row align-items-lg-center">
                <div className="col-md-3 col-lg-2">
                    <div className="d-flex align-items-center mb-2">
                        <span className="text-danger dateDay mr-3">{date.day}</span>
                        <div className="text-center">
                            <span className="d-block">{date.month}.</span>
                            <span className="d-block">{date.year}</span>
                        </div>
                    </div>
                    <span className="d-block text-muted">Time - {date.hours} : {date.minutes}</span>
                </div>
                <div className="col-md-9 col-lg-8">
                    <h3 className="h6 eventTitle mb-1">
                        {props.event.name}
                    </h3>
                    <p className='eventDescription'>{props.event.description}</p>
                </div>
                <div className="col-lg-2">
                    {
                        !isAlreadyRegistered ?
                            <button
                                className="btn btn-block btn-outline-danger"
                                disabled={!isLoggedin}
                                onClick={() => onClickRegister(props.event._id)}
                            >Register now

                            </button> :
                            <button
                                className="btn btn-block btn-outline-success"
                                disabled={isLoggedin}
                            >Registered

                            </button>
                    }


                    {
                        !isLoggedin && (
                            <small className='text-muted'>Signin to join events.</small>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default EventCard;