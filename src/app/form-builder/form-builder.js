import React from 'react';
import './form-builder.css';

function SaveButton(props) {
    return (
        <button className="spaced btn btn-primary" onClick={props.onSave}>
            Save Form
        </button>
    );
}

function AddInputButton(props) {
    return (
        <button
            className="spaced btn btn-secondary"
            onClick={props.onInputAdded}
        >
            Add Input
        </button>
    );
}

function FormActionButtons(props) {
    return (
        <div className="row padded">
            <AddInputButton onInputAdded={props.onInputAdded} />
            <SaveButton onSave={props.onSave} />
        </div>
    );
}

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

function SubInputs(props) {
    return (
        <div className="sub-inputs-list">
            {props.subInputs.map((subInputQuestion, index) => {
                const hasSubInputs = subInputQuestion.SubInputs ? true : false;
                const key = props.questionId + '_' + props.layer + '_' + index;
                console.log(key);
                if (hasSubInputs) {
                    return (
                        <div key={key}>
                            <div className="question-block padded">
                                <Condition
                                    subInputQuestion={subInputQuestion}
                                />
                                <QuestionBase question={subInputQuestion} />
                            </div>
                            <div>
                                <SubInputs
                                    layer={props.layer + 1}
                                    questionId={props.questionId}
                                    subInputs={subInputQuestion.SubInputs}
                                />
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={key}>
                            <div className="question-block padded">
                                <Condition
                                    subInputQuestion={subInputQuestion}
                                />
                                <QuestionBase question={subInputQuestion} />
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
}

function QuestionBase(props) {
    return (
        <div>
            <div className="form-group">
                <label htmlFor="Question">Question</label>
                <input
                    className="form-control"
                    onChange={() => {}}
                    value={props.question.Question}
                    name="Question"
                    type="text"
                />
            </div>
            <div className="form-group">
                <label htmlFor="QuestionType">Type</label>
                <select
                    className="form-control"
                    onChange={() => {}}
                    value={props.question.QuestionType}
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

function Questions(props) {
    return props.questions.map((question) => {
        return (
            <div key={question.Id}>
                <div className="question-block padded">
                    <QuestionBase question={question} />
                </div>
                <SubInputs
                    questionId={question.Id}
                    subInputs={question.SubInputs}
                    layer={1}
                />
            </div>
        );
    });
}

class FormBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: QUESTIONS,
        };
    }

    handleSave() {
        console.log(this.state.questions);
    }

    handleInputAdded() {
        console.log('input added');
    }

    render() {
        return (
            <div>
                <form>
                    <div className="card padded">
                        <h1>Form Builder</h1>
                        <Questions questions={this.state.questions} />
                    </div>
                    <FormActionButtons
                        onInputAdded={() => this.handleInputAdded()}
                        onSave={() => this.handleSave()}
                    />
                </form>
            </div>
        );
    }
}

const QUESTIONS = [
    {
        Id: 1,
        Question: 'Do you own a car?',
        QuestionType: 'YesNo',
        SubInputs: [
            {
                ConditionType: 'Equals',
                ConditionValue: 'Yes',
                Question: "What's your car's model?",
                QuestionType: 'Text',
                SubInputs: [
                    {
                        ConditionType: 'Equals',
                        ConditionValue: 'Ford',
                        Question: 'What color is your Ford?',
                        QuestionType: 'Text',
                    },
                    {
                        ConditionType: 'Equals',
                        ConditionValue: 'Ford',
                        Question: 'How many wheels does your Ford have?',
                        QuestionType: 'Number',
                        SubInputs: [
                            {
                                ConditionType: 'GreaterThan',
                                ConditionValue: 4,
                                Question: 'Is your Ford street legal?',
                                QuestionType: 'YesNo',
                            },
                        ],
                    },
                    {
                        ConditionType: 'Equals',
                        ConditionValue: 'Toyota',
                        Question: 'Has your Toyota been recalled?',
                        QuestionType: 'YesNo',
                    },
                ],
            },
        ],
    },
    {
        Id: 2,
        Question: 'What year was your building built?',
        QuestionType: 'Number',
        SubInputs: [],
    },
    {
        Id: 3,
        Question: "What's your company name?",
        QuestionType: 'Text',
        SubInputs: [],
    },
];

export default FormBuilder;
