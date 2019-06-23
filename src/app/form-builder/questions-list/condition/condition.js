import React from 'react';

function Condition(props) {
    return (
        <div className="form-group">
            <div className="inline-block col-md-8">
                <label htmlFor="ConditionTypeId">Condition</label>
                <select
                    name="ConditionTypeId"
                    className="form-control"
                    value={props.subInputQuestion.ConditionType}
                    onChange={() => {}}
                >
                    <option>Equals</option>
                </select>
            </div>
            <div className="inline-block col-md-4">
                <input
                    className="form-control"
                    type="text"
                    value={props.subInputQuestion.ConditionValue}
                    onChange={() => {}}
                />
            </div>
        </div>
    );
}

export default Condition;
