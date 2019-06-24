import React from 'react';

import { IQuestionBase } from '../../interfaces/question-base';
import { QuestionTypesEnum } from '../../enums/QuestionTypes';

interface QuestionBaseProps {
    layeredIndex: string;
    onQuestionChanged: (
        event:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>,
        layeredIndex: string,
    ) => void;
    onSubInputAdded: (layeredIndex: string) => void;
    onDelete: (layeredIndex: string) => void;
    question: IQuestionBase;
}

function QuestionBase(props: QuestionBaseProps) {
    const handleChange = (
        event:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>,
    ) => {
        props.onQuestionChanged(event, props.layeredIndex);
    };
    const handleSubInputAdded = () => {
        props.onSubInputAdded(props.layeredIndex);
    };
    const handleDelete = () => {
        props.onDelete(props.layeredIndex);
    };
    return (
        <div>
            <div className="form-group">
                <label htmlFor="Question">Question</label>
                <input
                    className="form-control"
                    value={props.question.Question}
                    onChange={handleChange}
                    name="Question"
                    type="text"
                />
            </div>
            <div className="form-group">
                <label htmlFor="QuestionType">Type</label>
                <select
                    className="form-control"
                    value={props.question.QuestionType}
                    onChange={handleChange}
                    name="QuestionType"
                >
                    <option value={QuestionTypesEnum.Text}>
                        {QuestionTypesEnum.Text}
                    </option>
                    <option value={QuestionTypesEnum.YesNo}>
                        {QuestionTypesEnum.YesNo}
                    </option>
                    <option value={QuestionTypesEnum.Number}>
                        {QuestionTypesEnum.Number}
                    </option>
                </select>
            </div>
            <div className="row padded pull-right">
                <button
                    type="button"
                    onClick={handleSubInputAdded}
                    className="spaced btn btn-secondary"
                >
                    Add Sub-Input
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="spaced btn btn-danger"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default QuestionBase;
