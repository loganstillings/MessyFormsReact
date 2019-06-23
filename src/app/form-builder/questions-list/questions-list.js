import React from 'react';

import QuestionBase from './question-base/question-base';
import SubInputs from './sub-inputs/sub-inputs';

function QuestionsList(props) {
    return props.questions.map((question) => {
        return (
            <div key={question.Id}>
                <div className="question-block padded">
                    <QuestionBase
                        onQuestionChanged={props.onQuestionChanged}
                        question={question}
                    />
                </div>
                <SubInputs
                    onQuestionChanged={props.onQuestionChanged}
                    subInputs={question.SubInputs}
                />
            </div>
        );
    });
}

export default QuestionsList;
