import React from 'react';

import SubInput from './sub-input';
import { ISubInput } from '../../../interfaces/sub-input';

interface SubInputsListProps {
    subInputs: ISubInput[];
    layeredIndex: string;
    onQuestionChanged: (
        event:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>,
        layeredIndex: string,
    ) => void;
    onSubInputAdded: (layeredIndex: string) => void;
    onDelete: (layeredIndex: string) => void;
    parentQuestionType: string;
}

function SubInputsList(props: SubInputsListProps) {
    return (
        <div className="sub-inputs-list">
            {props.subInputs.map(
                (subInputQuestion: ISubInput, index: number) => {
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
                                            subInputs={
                                                subInputQuestion.SubInputs
                                            }
                                            layeredIndex={layeredIndex}
                                            parentQuestionType={
                                                subInputQuestion.QuestionType
                                            }
                                            onSubInputAdded={
                                                props.onSubInputAdded
                                            }
                                            onDelete={props.onDelete}
                                        />
                                    </div>
                                )}
                        </div>
                    );
                },
            )}
        </div>
    );
}

export default SubInputsList;
