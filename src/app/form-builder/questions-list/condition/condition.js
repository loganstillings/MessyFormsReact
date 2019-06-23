import React from 'react';

function Condition(props) {
    const handleChange = (event) => {
        props.onQuestionChanged(event, props.layeredIndex);
    };
    return (
        <div className="form-group">
            <div className="inline-block col-md-8">
                <label htmlFor="ConditionType">Condition</label>
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
            </div>
            <div className="inline-block col-md-4">
                <input
                    name="ConditionValue"
                    className="form-control"
                    type="text"
                    value={props.subInputQuestion.ConditionValue}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default Condition;
