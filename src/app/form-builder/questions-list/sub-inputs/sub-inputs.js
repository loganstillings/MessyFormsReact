import React from 'react';

import SubInput from '../sub-input/sub-input';

function SubInputs(props) {
    return (
        <div className="sub-inputs-list">
            {props.subInputs.map((subInputQuestion, index) => {
                const layeredIndex = props.layeredIndex + '_' + index;
                return (
                    <div key={index}>
                        <SubInput
                            onQuestionChanged={props.onQuestionChanged}
                            subInputQuestion={subInputQuestion}
                            layeredIndex={layeredIndex}
                            parentQuestionType={props.parentQuestionType}
                        />
                        {subInputQuestion.SubInputs &&
                            subInputQuestion.SubInputs.length > 0 && (
                                <div>
                                    <SubInputs
                                        onQuestionChanged={
                                            props.onQuestionChanged
                                        }
                                        subInputs={subInputQuestion.SubInputs}
                                        layeredIndex={layeredIndex}
                                        parentQuestionType={
                                            subInputQuestion.QuestionType
                                        }
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
