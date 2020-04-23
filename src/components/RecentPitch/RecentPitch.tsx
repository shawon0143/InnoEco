import React from 'react';
import "./RecentPitch.scss";
import NewsCard from "../UI/NewsCard/NewsCard";
import {useSelector} from "react-redux";
import {AppState} from "../../store/configureStore";
import {TKnowledge} from "../../store/types/knowledge";


interface IProps {

}

const RecentPitch:React.FC<IProps> = (props:IProps) => {
    const allKnowledge = useSelector((state: AppState) => {
       return state.knowledge.allKnowledge;
    });
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
    let newsCardArray: any = [];
    newsCardArray = sortedLatestPitches.map((knowledge: TKnowledge, key: number) => {
       return (
           <NewsCard
               key={knowledge._id}
               fileUrl={knowledge.knowledgeFile}
               fileType={knowledge.knowledgeFileType}
               title={knowledge.title}
               description={knowledge.description}
               createdBy={knowledge.createdBy}
               createdAt={new Date(knowledge.createdAt)}
               noOfLikes={knowledge.likes.length}
               noOfComments={knowledge.comments.length}
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
                            {newsCardArray}
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col text-center">
                        <button className='btn btn-secondary'>
                            View all <i className='icons icon-arrow-right-circle ml-3'/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentPitch;
