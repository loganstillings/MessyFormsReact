import React from 'react';

import QuestionBase from './question-base';
import SubInputsList from './sub-inputs/sub-inputs-list';

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
                    <SubInputsList
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
