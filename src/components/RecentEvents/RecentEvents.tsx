import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/configureStore';
import './RecentEvents.scss';
import { TEvent } from '../../store/types/event';
import EventCard from '../UI/EventCard/EventCard';
import Spinner from '../UI/Spinner/Spinner';

interface IProps {

}

const RecentEvents:React.FC<IProps> = (props: IProps) => {
    const allEvents = useSelector((state: AppState) => state.event.allEvents);
    const loading = useSelector((state: AppState) => state.event.loading);
    let sortedLatestEvents = [];
    for (let key in allEvents) {
        if (allEvents.hasOwnProperty(key)) {
            allEvents[key]._id = key;
            sortedLatestEvents.push(allEvents[key]);
        }
    }
    sortedLatestEvents = sortedLatestEvents.sort((a:any, b:any) => a.eventDate - b.eventDate).slice(0,3);
    let eventsCardArray = sortedLatestEvents.map((event: TEvent, key: number) => {
        return (
            <EventCard key={key} event={event} />
        )
    });

    return (
        <div className='recentEventsContainer'>
            <div className="container">
                <div className="row mb-5">
                    <div className="col text-center">
                        <h2>More Ways to Know InnoEco with Events</h2>
                        <p className='text-muted text-center'>Grow your business, go global, and boost conversions in other countries by localizing your education experience.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {loading ? <Spinner/> : eventsCardArray}
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col text-center">
                        <button className='btn btn-danger' onClick={() => {}}>
                            View all Events
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentEvents;