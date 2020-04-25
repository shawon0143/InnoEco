import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/configureStore";
import {TKnowledge} from "../../store/types/knowledge";
import NewsCard from "../../components/UI/NewsCard/NewsCard";
import * as actions from "../../store/actions/index";
import {useHistory} from "react-router-dom";

interface IProps {

}

const PitchHub:React.FC<IProps> = (props: IProps) => {
    let history = useHistory();
    const dispatch = useDispatch();
    const allKnowledge = useSelector((state: AppState) => {
        return state.knowledge.allKnowledge;
    });
    let sortedPitch = [];
    for (let key in allKnowledge) {
        if (allKnowledge.hasOwnProperty(key)) {
            allKnowledge[key]._id = key;
            sortedPitch.push(allKnowledge[key]);
        }
    }
    sortedPitch = sortedPitch.sort((a:any, b:any) => a.createdAt - b.createdAt);
    sortedPitch = sortedPitch.filter((item: TKnowledge) => {
        return item.type === 'pitch'
    });
    useEffect(() => {
        if (sortedPitch.length === 0) {
            dispatch(actions.getAllKnowledge());
        }
    }, [dispatch,sortedPitch]);
    useEffect(() => {
        window.scrollTo(0,0);
    });
    let newsCardArray: any;
    newsCardArray = sortedPitch.map((knowledge: TKnowledge, key: number) => {
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
                    cardClicked={(id) => history.push(`/pitchHub/${id}`)}
                    id={knowledge._id}
                />
            </div>
        )
    });
    return (
        <div className="container topNavMargin">
            <h1>PitchHub</h1>
            <div className="row">
                {newsCardArray}
            </div>
        </div>
    );
};

export default PitchHub;
