import React from 'react';

import { ISubInput } from '../../../interfaces/sub-input';
import { QuestionTypesEnum } from '../../../enums/QuestionTypes';
import { ConditionTypesEnum } from '../../../enums/ConditionTypes';

interface ConditionProps {
    layeredIndex: string;
    onQuestionChanged: (
        event:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>,
        layeredIndex: string,
    ) => void;
    parentQuestionType: string;
    subInputQuestion: ISubInput;
}

function Condition(props: ConditionProps) {
    const handleChange = (
        event:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>,
    ) => {
        props.onQuestionChanged(event, props.layeredIndex);
    };
    return (
        <div className="form-group">
            <div className="inline-block col-md-8">
                <label htmlFor="ConditionType">Condition</label>
                {props.parentQuestionType === QuestionTypesEnum.Number && (
                    <select
                        name="ConditionType"
                        className="form-control"
                        value={props.subInputQuestion.ConditionType}
                        onChange={handleChange}
                    >
                        <option value={ConditionTypesEnum.Equals}>
                            Equals
                        </option>
                        <option value={ConditionTypesEnum.GreaterThan}>
                            Greater Than
                        </option>
                        <option value={ConditionTypesEnum.LessThan}>
                            Less Than
                        </option>
                    </select>
                )}
                {props.parentQuestionType !== QuestionTypesEnum.Number && (
                    <select
                        name="ConditionType"
                        className="form-control"
                        value={props.subInputQuestion.ConditionType}
                        onChange={handleChange}
                    >
                        <option value={ConditionTypesEnum.Equals}>
                            Equals
                        </option>
                    </select>
                )}
            </div>
            <div className="inline-block col-md-4">
                {props.parentQuestionType === QuestionTypesEnum.Text && (
                    <input
                        name="ConditionValue"
                        className="form-control"
                        type="text"
                        value={props.subInputQuestion.ConditionValue}
                        onChange={handleChange}
                    />
                )}
                {props.parentQuestionType === QuestionTypesEnum.Number && (
                    <input
                        name="ConditionValue"
                        className="form-control"
                        type="number"
                        value={props.subInputQuestion.ConditionValue}
                        onChange={handleChange}
                    />
                )}
                {props.parentQuestionType === QuestionTypesEnum.YesNo && (
                    <select
                        name="ConditionValue"
                        className="form-control"
                        value={props.subInputQuestion.ConditionValue}
                        onChange={handleChange}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                )}
            </div>
        </div>
    );
}

export default Condition;
