import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/configureStore";
import {TKnowledge} from "../../store/types/knowledge";
import NewsCard from "../../components/UI/NewsCard/NewsCard";
import * as actions from "../../store/actions/index";
import {useHistory, useParams} from "react-router-dom";
import SingleKnowledge from "../../components/SingleKnowledge/SingleKnowledge";
import Spinner from "../../components/UI/Spinner/Spinner";

interface IProps {

}

const PitchHub:React.FC<IProps> = (props: IProps) => {
    let history = useHistory();
    let { id } = useParams();
    const dispatch = useDispatch();
    const allKnowledge = useSelector((state: AppState) => {
        return state.knowledge.allKnowledge;
    });
    const loading = useSelector((state: AppState) => state.knowledge.getAllKnowledgeLoading);
    let allPitch: any = [];
    let newsCardArray: any;
    // convert allKnowledge to array
    for (let key in allKnowledge) {
        if (allKnowledge.hasOwnProperty(key)) {
            allKnowledge[key]._id = key;
            allPitch.push(allKnowledge[key]);
        }
    }
    // we  get all knowledge if store is empty
    useEffect(() => {
        if (allPitch.length === 0) {
            dispatch(actions.getAllKnowledge());
        }
    }, [dispatch,allPitch]);
    // always scroll to top
    useEffect(() => {
        window.scrollTo(0,0);
    }, [id]);
    // check params if it is a single item request

    let selectedKnowledge: any;
    if (id) {
        // we got route param so we extraxt only that information
        selectedKnowledge = allPitch.find((item: TKnowledge) => {
            return item._id === id
        });
    }
    // sort by date
    allPitch = allPitch.sort((a:any, b:any) => a.createdAt - b.createdAt);
    // filter only pitch items
    allPitch = allPitch.filter((item: TKnowledge) => {
        return item.type === 'pitch'
    });
    newsCardArray = allPitch.map((knowledge: TKnowledge, key: number) => {
        return (
            <div className='col-md-3 col-sm-12' key={knowledge._id}>
                <NewsCard
                    knowledge={knowledge}
                    cardClicked={(id) => history.push(`/pitchHub/${id}`)}
                />
            </div>
        )
    });

    return (
        <div className="container topNavMargin py-5">
            {!id && (<h2 className='border-bottom mb-4'>PitchHub</h2>)}
            {!id && (<div className="row">{loading ? <Spinner /> : newsCardArray}</div>)}
            { id ? <SingleKnowledge knowledge={selectedKnowledge}/> : undefined }
        </div>
    );
};

export default PitchHub;
