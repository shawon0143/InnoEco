import React from 'react';

interface IProps {

}

const About:React.FC<IProps> = (props: IProps) => {
    return (
        <div className="container topNavMargin">
            <div className="row">
                <div className="col p-5 m-5">
                    <h3 className='mb-0'>We are InnoEco</h3>
                    <small className='text-muted'>A digital platform for Innovation Ecosystem</small>
                    <p className='text-secondary text-justify mt-5'>
                        To start with, there will be different stakeholders in the IES digital platform.
                        In this platform, a user can be an institution or a person and each stakeholder can communicate with each other.
                        For example, sending an invitation for an event, sending messages, looking for domain experts or co-founders etc.
                        There will be many companies, universities or research institutes and experts, scientists on the platform.
                        These institutes will be able to exchange knowledge among themselves through this platform.
                        For example, a company may face a problem which is already solved by a research institute. In this platform,
                        the company will be able to ask for help to solve the specific problem and any expert or other company or the
                        university can come forward with the knowledge they have to address the issues. Startups and Entrepreneurs can
                        share information about ideas, funding opportunities, required resources for projects. The system will inform
                        users with notifications of new events, new messages, research opportunities, job openings etc.
                        Companies will be able to share their successful projects as a post.
                    </p>
                </div>
            </div>


        </div>
    );
};

export default About;