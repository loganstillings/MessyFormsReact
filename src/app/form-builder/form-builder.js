import React from 'react';
import './form-builder.css';

function SaveButton(props) {
    return <button onClick={props.onSave}>Save</button>;
}

function AddInputButton(props) {
    return <button onClick={props.onInputAdded}>Add Input</button>;
}

function FormActionButtons(props) {
    return (
        <div>
            <AddInputButton onInputAdded={props.onInputAdded} />
            <SaveButton onSave={props.onSave} />
        </div>
    );
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
                <h1>Form Builder</h1>
                <FormActionButtons
                    onInputAdded={() => this.handleInputAdded()}
                    onSave={() => this.handleSave()}
                />
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
