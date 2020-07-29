import React from 'react';
import {useSelector} from "react-redux";
import { AppState } from '../../../store/configureStore';
import {TEvent} from "../../../store/types/event";
import EventCard from "../../UI/EventCard/EventCard";
import {sessionInfo} from "../../../shared/axios";

interface IProps {

}

const MyEvents:React.FC<IProps> = (props: IProps) => {
    const allEvents = useSelector((state: AppState) => state.event.allEvents);
    let sortedLatestEvents: any = [];
    for (let key in allEvents) {
        if (allEvents.hasOwnProperty(key)) {
            if (allEvents[key].createdBy === sessionInfo().id) {
                allEvents[key]._id = key;
                sortedLatestEvents.push(allEvents[key]);
            }
        }
    }
    sortedLatestEvents = sortedLatestEvents.sort((a:any, b:any) => a.eventDate - b.eventDate).slice(0,3);
    let eventsCardArray = sortedLatestEvents.map((event: TEvent, key: number) => {
        return (
            <EventCard key={key} event={event} />
        )
    });
    return (
        <div>
            <h5>All Events</h5>
            <hr/>
            {eventsCardArray}
        </div>
    );
};

export default MyEvents;