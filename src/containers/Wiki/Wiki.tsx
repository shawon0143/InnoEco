import React from 'react';
import {useSelector} from "react-redux";
import {AppState} from "../../store/configureStore";
import {TKnowledge} from "../../store/types/knowledge";
import NewsCard from "../../components/UI/NewsCard/NewsCard";

interface IProps {

}

const Wiki:React.FC<IProps> = (props:IProps) => {
    const allKnowledge = useSelector((state: AppState) => {
        return state.knowledge.allKnowledge;
    });
    let sortedWiki = [];
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
    console.log(sortedWiki);
    let newsCardArray: any = [];
    newsCardArray = sortedWiki.map((knowledge: TKnowledge, key: number) => {
        return (
            <div className='col-3'>
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
            </div>
        )
    });
    return (
        <div className="topNavMargin bg-white">
            <div className="container">
                <h1>Wiki</h1>
                <div className="row">
                {/*    <div className="col">*/}
                        <div className="card-deck">
                            {newsCardArray}
                        </div>
                {/*    </div>*/}
                </div>
            </div>
        </div>
    );
};

export default Wiki;
