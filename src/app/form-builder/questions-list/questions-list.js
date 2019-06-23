import React from 'react';

import QuestionBase from './question-base/question-base';
import SubInputs from './sub-inputs/sub-inputs';

function QuestionsList(props) {
    const ZERO = 0;
    const ONE = 1;
    return props.questions.map((question) => {
        return (
            <div key={question.Id}>
                <div className="question-block padded">
                    <QuestionBase
                        onQuestionChanged={props.onQuestionChanged}
                        question={question}
                        questionId={question.Id}
                        layer={ZERO}
                        index={ZERO}
                    />
                </div>
                {question.SubInputs && question.SubInputs.length > 0 && (
                    <SubInputs
                        onQuestionChanged={props.onQuestionChanged}
                        subInputs={question.SubInputs}
                        layer={ONE}
                        questionId={question.Id}
                    />
                )}
            </div>
        );
    });
}

export default QuestionsList;
