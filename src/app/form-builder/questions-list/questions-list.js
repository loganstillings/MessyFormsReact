import React from 'react';

import QuestionBase from './question-base/question-base';
import SubInputs from './sub-inputs/sub-inputs';

function QuestionsList(props) {
    return props.questions.map((question, index) => {
        return (
            <div key={question.Id}>
                <div className="question-block padded">
                    <QuestionBase
                        onQuestionChanged={props.onQuestionChanged}
                        question={question}
                        layeredIndex={index}
                    />
                </div>
                {question.SubInputs && question.SubInputs.length > 0 && (
                    <SubInputs
                        onQuestionChanged={props.onQuestionChanged}
                        subInputs={question.SubInputs}
                        layeredIndex={index}
                    />
                )}
            </div>
        );
    });
}

export default QuestionsList;
