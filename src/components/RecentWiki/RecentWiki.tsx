import React from 'react';
import NewsCard from "../UI/NewsCard/NewsCard";
import "./RecentWiki.scss";

interface IProps {

}

const RecentWiki:React.FC<IProps> = () => {

    return (
        <div className='recentWikiContainer container'>
            <div className="row">
                <div className="col">
                    <div className="card-deck">
                        <NewsCard />
                        <NewsCard />
                        <NewsCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentWiki;
