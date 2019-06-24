import React from 'react';

import QuestionBase from '../question-base';
import Condition from './condition';

import { ISubInput } from '../../../interfaces/sub-input';
import { QuestionTypesEnum } from '../../../enums/QuestionTypes';

interface SubInputProps {
    layeredIndex: string;
    onQuestionChanged: (
        event:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>,
        layeredIndex: string,
    ) => void;
    parentQuestionType: QuestionTypesEnum;
    subInputQuestion: ISubInput;
    onSubInputAdded: (layeredIndex: string) => void;
    onDelete: (layeredIndex: string) => void;
}

function SubInput(props: SubInputProps) {
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
