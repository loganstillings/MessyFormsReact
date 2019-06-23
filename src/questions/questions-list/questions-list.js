import React from 'react';

import QuestionBase from '../question-base/question-base';
import SubInputs from '../sub-inputs/sub-inputs';

function QuestionsList(props) {
    return props.questions.map((question, index) => {
        return (
            <div key={question.Id}>
                <div className="question-block padded">
                    <QuestionBase
                        onQuestionChanged={props.onQuestionChanged}
                        question={question}
                        layeredIndex={index}
                        onSubInputAdded={props.onSubInputAdded}
                        onDelete={props.onDelete}
                    />
                </div>
                {question.SubInputs && question.SubInputs.length > 0 && (
                    <SubInputs
                        onQuestionChanged={props.onQuestionChanged}
                        subInputs={question.SubInputs}
                        layeredIndex={index}
                        parentQuestionType={question.QuestionType}
                        onSubInputAdded={props.onSubInputAdded}
                        onDelete={props.onDelete}
                    />
                )}
            </div>
        );
    });
}

export default QuestionsList;
