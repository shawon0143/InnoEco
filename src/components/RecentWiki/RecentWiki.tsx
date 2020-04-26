import React from 'react';
import NewsCard from "../UI/NewsCard/NewsCard";
import "./RecentWiki.scss";
import {useSelector} from "react-redux";
import {AppState} from "../../store/configureStore";
import {TKnowledge} from "../../store/types/knowledge";
import {useHistory} from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";

interface IProps {

}

const RecentWiki:React.FC<IProps> = (props: IProps) => {
    let history = useHistory();
    const allKnowledge = useSelector((state: AppState) => {
        return state.knowledge.allKnowledge;
    });
    const loading = useSelector((state: AppState) => state.knowledge.getAllKnowledgeLoading);
    let sortedLatestWiki = [];
    for (let key in allKnowledge) {
        if (allKnowledge.hasOwnProperty(key)) {
            allKnowledge[key]._id = key;
            sortedLatestWiki.push(allKnowledge[key]);
        }
    }
    sortedLatestWiki = sortedLatestWiki.filter((item: TKnowledge) => {
        return item.type !== 'pitch'
    });
    sortedLatestWiki = sortedLatestWiki.sort((a:any, b:any) => a.createdAt - b.createdAt).slice(0,4);
    let newsCardArray: any = [];
    newsCardArray = sortedLatestWiki.map((knowledge: TKnowledge, key: number) => {
        return (
            <NewsCard
                key={knowledge._id}
                knowledge={knowledge}
                cardClicked={(id) => history.push(`/wiki/${id}`)}
            />
        )
    });
    return (
        <div className='recentWikiContainer'>
            <div className="container">
                <div className="row mb-5">
                    <div className="col text-center">
                        <h2>Latest wiki</h2>
                        <p className='text-muted'>Experience a level of quality in both design & customization.</p>
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
                        <button className='btn btn-secondary' onClick={() => history.push('/wiki')}>
                            View all <i className='icons icon-arrow-right-circle ml-3'/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentWiki;
