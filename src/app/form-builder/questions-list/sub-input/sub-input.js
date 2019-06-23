import React from 'react';

import QuestionBase from '../question-base/question-base';
import Condition from '../condition/condition';

function SubInput(props) {
    const subInputQuestion = props.subInputQuestion;
    return (
        <div className="question-block padded">
            <Condition subInputQuestion={subInputQuestion} />
            <QuestionBase
                onQuestionChanged={props.onQuestionChanged}
                question={subInputQuestion}
            />
        </div>
    );
}

export default SubInput;
