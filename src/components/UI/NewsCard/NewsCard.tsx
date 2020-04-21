import React from 'react';

interface IProps {
    imageUrl?: string;
    title?: string;
    description?: string;
    createdBy?: string;
    noOfLikes?: number;
    noOfComments?: number;
}

const NewsCard: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="card">
            <img src="" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.</p>
            </div>
            <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
            </div>
        </div>
    );
};

export default NewsCard;
