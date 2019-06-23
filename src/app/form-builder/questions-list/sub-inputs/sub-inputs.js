import React from 'react';

import SubInput from '../sub-input/sub-input';

function SubInputs(props) {
    return (
        <div className="sub-inputs-list">
            {props.subInputs.map((subInputQuestion, index) => {
                const hasSubInputs = subInputQuestion.SubInputs ? true : false;
                if (hasSubInputs) {
                    return (
                        <div key={index}>
                            <SubInput
                                onQuestionChanged={props.onQuestionChanged}
                                subInputQuestion={subInputQuestion}
                            />
                            <div>
                                <SubInputs
                                    onQuestionChanged={props.onQuestionChanged}
                                    subInputs={subInputQuestion.SubInputs}
                                />
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={index}>
                            <SubInput
                                onQuestionChanged={props.onQuestionChanged}
                                subInputQuestion={subInputQuestion}
                            />
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default SubInputs;
