import React from 'react';
import './ProfileInfo.scss';

interface IProps {
    userInfo: {
        firstName: string;
        lastName: string;
        role: string;
        address: any;
        mobile: string;
        phone?: string;
    };
}
const ProfileInfo: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="profileInfoContainer p-3 mb-4 border rounded shadow-sm bg-white">
            <div className="row">
                <div className="col">
                    <h4 className="text-primary">
                        {props.userInfo.firstName} {props.userInfo.lastName}
                    </h4>
                    <div className="py-1">
                        <i className="icons icon-badge mr-2 text-muted" />
                        <span className="text-muted">
                            {props.userInfo.role}
                        </span>
                    </div>
                    <div className="py-1">
                        <i className="icons icon-location-pin mr-2 text-muted" />
                        <span className="text-muted">
                            {props.userInfo && props.userInfo.address && props.userInfo.address[0] ? props.userInfo.address[0].zipCode +
                                ' ' +
                                props.userInfo.address[0].street +
                                ', ' +
                                props.userInfo.address[0].city +
                                ', ' +
                                props.userInfo.address[0].country : "" }
                        </span>
                    </div>
                    <div className="py-1">
                        <i className="icons icon-screen-smartphone  mr-2 text-muted" />
                        <span className="text-muted">
                            {props.userInfo.mobile}
                        </span>
                    </div>
                    <div className="py-1">
                        <i className="icons icon-phone  mr-2 text-muted" />
                        <span className="text-muted">
                            {props.userInfo.phone}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
