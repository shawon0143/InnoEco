import React from 'react';
// import NewsCard from "../UI/NewsCard/NewsCard";
import "./RecentWiki.scss";

interface IProps {

}

const RecentWiki:React.FC<IProps> = () => {

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
                            <small>coming soon..</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentWiki;
