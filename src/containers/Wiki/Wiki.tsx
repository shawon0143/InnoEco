import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/configureStore";
import {TKnowledge} from "../../store/types/knowledge";
import NewsCard from "../../components/UI/NewsCard/NewsCard";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import {useHistory} from "react-router-dom";

interface IProps {

}

const Wiki:React.FC<IProps> = (props:IProps) => {
    let history = useHistory();
    const dispatch = useDispatch();
    const allKnowledge = useSelector((state: AppState) => {
        return state.knowledge.allKnowledge;
    });
    const loading = useSelector((state: AppState) => state.knowledge.getAllKnowledgeLoading);
    let sortedWiki: any = [];
    for (let key in allKnowledge) {
        if (allKnowledge.hasOwnProperty(key)) {
            allKnowledge[key]._id = key;
            sortedWiki.push(allKnowledge[key]);
        }
    }
    sortedWiki = sortedWiki.sort((a:any, b:any) => a.createdAt - b.createdAt);
    sortedWiki = sortedWiki.filter((item: TKnowledge) => {
        return item.type !== 'pitch'
    });
    useEffect(() => {
        if (sortedWiki.length === 0) {
            dispatch(actions.getAllKnowledge());
        }
    }, [dispatch,sortedWiki]);
    useEffect(() => {
        window.scrollTo(0,0);
    });
    let newsCardArray: any;
    newsCardArray = sortedWiki.map((knowledge: TKnowledge, key: number) => {
        return (
            <div className='col-md-3 col-sm-12' key={knowledge._id}>
                <NewsCard
                    fileUrl={knowledge.knowledgeFile}
                    fileType={knowledge.knowledgeFileType}
                    title={knowledge.title}
                    description={knowledge.description}
                    createdBy={knowledge.createdBy}
                    createdAt={new Date(knowledge.createdAt)}
                    noOfLikes={knowledge.likes.length}
                    noOfComments={knowledge.comments.length}
                    type={knowledge.type}
                    cardClicked={(id) => history.push(`/wiki/${id}`)}
                    id={knowledge._id}
                />
            </div>
        )
    });

    return (
            <div className="container topNavMargin py-5">
                <h1>Wiki</h1>
                <div className="row">
                    {loading ? <Spinner/> : newsCardArray}
                </div>
            </div>
    );
};

export default Wiki;
