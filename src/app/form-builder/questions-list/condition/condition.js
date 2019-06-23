import React from 'react';

function Condition(props) {
    const handleChange = (event) => {
        props.onQuestionChanged(event, props.layeredIndex);
    };
    return (
        <div className="form-group">
            <div className="inline-block col-md-8">
                <label htmlFor="ConditionType">Condition</label>
                {props.parentQuestionType === 'Number' && (
                    <select
                        name="ConditionType"
                        className="form-control"
                        value={props.subInputQuestion.ConditionType}
                        onChange={handleChange}
                    >
                        <option value="Equals">Equals</option>
                        <option value="GreaterThan">Greater Than</option>
                        <option value="LessThan">Less Than</option>
                    </select>
                )}
                {props.parentQuestionType !== 'Number' && (
                    <select
                        name="ConditionType"
                        className="form-control"
                        value={props.subInputQuestion.ConditionType}
                        onChange={handleChange}
                    >
                        <option value="Equals">Equals</option>
                    </select>
                )}
            </div>
            <div className="inline-block col-md-4">
                {props.parentQuestionType === 'Text' && (
                    <input
                        name="ConditionValue"
                        className="form-control"
                        type="text"
                        value={props.subInputQuestion.ConditionValue}
                        onChange={handleChange}
                    />
                )}
                {props.parentQuestionType === 'Number' && (
                    <input
                        name="ConditionValue"
                        className="form-control"
                        type="number"
                        value={props.subInputQuestion.ConditionValue}
                        onChange={handleChange}
                    />
                )}
                {props.parentQuestionType === 'YesNo' && (
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
