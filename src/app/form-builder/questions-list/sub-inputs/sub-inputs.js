import React from 'react';

import SubInput from '../sub-input/sub-input';

function SubInputs(props) {
    return (
        <div className="sub-inputs-list">
            {props.subInputs.map((subInputQuestion, index) => {
                return (
                    <div key={index}>
                        <SubInput
                            onQuestionChanged={props.onQuestionChanged}
                            subInputQuestion={subInputQuestion}
                            questionId={props.questionId}
                            layer={props.layer}
                            index={index}
                        />
                        {subInputQuestion.SubInputs &&
                            subInputQuestion.SubInputs.length > 0 && (
                                <div>
                                    <SubInputs
                                        onQuestionChanged={
                                            props.onQuestionChanged
                                        }
                                        subInputs={subInputQuestion.SubInputs}
                                        layer={props.layer + 1}
                                        questionId={props.questionId}
                                    />
                                </div>
                            )}
                    </div>
                );
            })}
        </div>
    );
}

export default SubInputs;
