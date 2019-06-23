import React from 'react';

function QuestionBase(props) {
    const questionLayerIndex =
        props.questionId + '_' + props.layer + '_' + props.index;
    const handleChange = (event) => {
        props.onQuestionChanged(event, questionLayerIndex);
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
                    <option value="Text">Text</option>
                    <option value="YesNo">YesNo</option>
                    <option value="Number">Number</option>
                </select>
            </div>
            <div className="row padded pull-right">
                <button type="button" className="spaced btn btn-secondary">
                    Add Sub-Input
                </button>
                <button type="button" className="spaced btn btn-danger">
                    Delete
                </button>
            </div>
        </div>
    );
}

export default QuestionBase;
