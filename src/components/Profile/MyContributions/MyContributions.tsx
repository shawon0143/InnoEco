import React from 'react';
import CreateKnowledgeForm from "../../Knowledge/CreateKnowledgeForm/CreateKnowledgeForm";

interface IProps {

}
const MyContributions:React.FC<IProps> = (props: IProps) => {
    return (
        <div>
            {/*<h5> My contribution</h5>*/}
            <CreateKnowledgeForm />
        </div>
    );
};

export default MyContributions;
