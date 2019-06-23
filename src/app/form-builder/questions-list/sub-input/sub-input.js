import React from 'react';

import QuestionBase from '../question-base/question-base';
import Condition from '../condition/condition';

function SubInput(props) {
    const subInputQuestion = props.subInputQuestion;
    return (
        <div className="question-block padded">
            <Condition
                subInputQuestion={subInputQuestion}
                onQuestionChanged={props.onQuestionChanged}
                questionId={props.questionId}
                layer={props.layer}
                index={props.index}
            />
            <QuestionBase
                onQuestionChanged={props.onQuestionChanged}
                question={subInputQuestion}
                questionId={props.questionId}
                layer={props.layer}
                index={props.index}
            />
        </div>
    );
}

export default SubInput;
