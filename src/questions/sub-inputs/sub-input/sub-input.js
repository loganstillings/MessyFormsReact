import React from 'react';

import QuestionBase from '../../question-base/question-base';
import Condition from '../condition/condition';

function SubInput(props) {
    return (
        <div className="question-block padded">
            <Condition
                subInputQuestion={props.subInputQuestion}
                onQuestionChanged={props.onQuestionChanged}
                layeredIndex={props.layeredIndex}
                parentQuestionType={props.parentQuestionType}
            />
            <QuestionBase
                onQuestionChanged={props.onQuestionChanged}
                question={props.subInputQuestion}
                layeredIndex={props.layeredIndex}
                onSubInputAdded={props.onSubInputAdded}
                onDelete={props.onDelete}
            />
        </div>
    );
}

export default SubInput;
