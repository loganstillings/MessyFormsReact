import React from 'react';

import SubInput from './sub-input';

function SubInputsList(props) {
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
                            onSubInputAdded={props.onSubInputAdded}
                            onDelete={props.onDelete}
                        />
                        {subInputQuestion.SubInputs &&
                            subInputQuestion.SubInputs.length > 0 && (
                                <div>
                                    <SubInputsList
                                        onQuestionChanged={
                                            props.onQuestionChanged
                                        }
                                        subInputs={subInputQuestion.SubInputs}
                                        layeredIndex={layeredIndex}
                                        parentQuestionType={
                                            subInputQuestion.QuestionType
                                        }
                                        onSubInputAdded={props.onSubInputAdded}
                                        onDelete={props.onDelete}
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
