import React from 'react';
import "./RecentPitch.scss";
import NewsCard from "../UI/NewsCard/NewsCard";
import {useSelector} from "react-redux";
import {AppState} from "../../store/configureStore";
import {TKnowledge} from "../../store/types/knowledge";
import {useHistory} from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";


interface IProps {

}

const RecentPitch:React.FC<IProps> = (props:IProps) => {
    let history = useHistory();
    const allKnowledge = useSelector((state: AppState) => {
       return state.knowledge.allKnowledge;
    });
    const loading = useSelector((state: AppState) => state.knowledge.getAllKnowledgeLoading);
    let sortedLatestPitches = [];
    for (let key in allKnowledge) {
        if (allKnowledge.hasOwnProperty(key)) {
            allKnowledge[key]._id = key;
            sortedLatestPitches.push(allKnowledge[key]);
        }
    }
    sortedLatestPitches = sortedLatestPitches.filter((item: TKnowledge) => {
        return item.type === 'pitch'
    });
    sortedLatestPitches = sortedLatestPitches.sort((a:any, b:any) => a.createdAt - b.createdAt).slice(0,4);
    let newsCardArray: any;
    newsCardArray = sortedLatestPitches.map((knowledge: TKnowledge, key: number) => {
       return (
           <NewsCard
               key={knowledge._id}
               knowledge={knowledge}
               cardClicked={(id) => history.push(`/pitchHub/${id}`)}
           />
       )
    });
    return (
        <div className='recentPitchContainer'>
            <div className="container">
                <div className="row mb-5">
                    <div className="col text-center">
                        <h2>New in PitchHub</h2>
                        <p className='text-muted'>We're an ambitious workaholic, but apart from that, pretty simple person.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card-deck">
                            {loading ? <Spinner/> : newsCardArray}
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col text-center">
                        <button className='btn btn-secondary' onClick={() => history.push('/pitchHub')}>
                            View all <i className='icons icon-arrow-right-circle ml-3'/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentPitch;
