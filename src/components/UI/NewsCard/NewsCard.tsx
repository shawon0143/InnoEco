import React from 'react';
import ReactPlayer from "react-player";
import dateFormat from 'dateformat';

interface IProps {
    imageUrl: string;
    title: string;
    description: string;
    createdBy: string;
    noOfLikes: number;
    noOfComments: number;
    createdAt: Date;
}

dateFormat.i18n = {
    dayNames: [
        'Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam',
        'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'
    ],
    monthNames: [
        'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez',
        'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ],
    timeNames: [
        'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ]
};

const NewsCard: React.FC<IProps> = (props: IProps) => {

    return (
        <div className="card mb-3" style={{ maxWidth: 540 }}>
            <div className="row no-gutters">
                <div className="col-4 col-md-12">
                    {
                        props.imageUrl.includes('-video(') && (
                            <ReactPlayer
                                url={props.imageUrl}
                                width='100%'
                                height='100%'
                                onError={(e) => console.log(e)}
                            />
                        )
                    }

                    {
                        props.imageUrl.includes('-image(') && (
                            <img
                                src={props.imageUrl}
                                className="card-img"
                                alt="..."
                            />
                        )
                    }
                    {
                        props.imageUrl.includes('-pdf(') && (
                            <img
                                src="https://inno-eco.s3.amazonaws.com/imageFile-image(1587589709976)"
                                alt="pdf"
                            />
                        )
                    }

                </div>
                <div className="col-8 col-md-12">
                    <div className="card-body">
                        <p className="card-text">
                            <small className="text-muted">
                                {dateFormat(props.createdAt, 'mmm  dd, yyyy' )}
                            </small>
                        </p>
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">
                            {props.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
