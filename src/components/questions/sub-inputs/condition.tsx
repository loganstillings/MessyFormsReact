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
    parentQuestionType: QuestionTypesEnum;
    subInputQuestion: ISubInput;
}

class Condition extends React.Component<ConditionProps, {}> {
    constructor(props: ConditionProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(
        event:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>,
    ): void {
        this.props.onQuestionChanged(event, this.props.layeredIndex);
    }

    private getElementForConditionType(): JSX.Element {
        switch (this.props.parentQuestionType) {
            case QuestionTypesEnum.Number:
                return (
                    <select
                        name="ConditionType"
                        className="form-control"
                        value={this.props.subInputQuestion.ConditionType}
                        onChange={this.handleChange}
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
                );
            default:
                return (
                    <select
                        name="ConditionType"
                        className="form-control"
                        value={this.props.subInputQuestion.ConditionType}
                        onChange={this.handleChange}
                    >
                        <option value={ConditionTypesEnum.Equals}>
                            Equals
                        </option>
                    </select>
                );
        }
    }

    private getElementForConditionValue(): JSX.Element {
        switch (this.props.parentQuestionType) {
            case QuestionTypesEnum.Number:
                return (
                    <input
                        name="ConditionValue"
                        className="form-control"
                        type="number"
                        value={this.props.subInputQuestion.ConditionValue}
                        onChange={this.handleChange}
                    />
                );
            case QuestionTypesEnum.Text:
                return (
                    <input
                        name="ConditionValue"
                        className="form-control"
                        type="text"
                        value={this.props.subInputQuestion.ConditionValue}
                        onChange={this.handleChange}
                    />
                );
            case QuestionTypesEnum.YesNo:
                return (
                    <select
                        name="ConditionValue"
                        className="form-control"
                        value={this.props.subInputQuestion.ConditionValue}
                        onChange={this.handleChange}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                );
        }
    }

    render() {
        return (
            <div className="form-group">
                <div className="inline-block col-md-8">
                    <label htmlFor="ConditionType">Condition</label>
                    {this.getElementForConditionType()}
                </div>
                <div className="inline-block col-md-4">
                    {this.getElementForConditionValue()}
                </div>
            </div>
        );
    }
}

export default Condition;
