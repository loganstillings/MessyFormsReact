import React from 'react';

import './form-builder.css';
import FormActionButtons from './form-action-buttons/form-action-buttons';
import QuestionsList from './questions-list/questions-list';

class FormBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: QUESTIONS,
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleQuestionChanged = this.handleQuestionChanged.bind(this);
    }

    handleSave() {
        console.log(this.state.questions);
    }

    handleQuestionChanged(event, layeredIndex) {
        const fieldName = event.target.name;
        const newValue = event.target.value;
        const questionsCopy = [...this.state.questions];
        let updatedQuestions = updateQuestions(
            questionsCopy,
            layeredIndex,
            fieldName,
            newValue,
        );
        this.setState({
            questions: updatedQuestions,
        });
    }

    handleInputAdded() {
        let questions = this.state.questions;
        this.setState({
            questions: questions.concat([
                {
                    Id: questions.length + 1,
                    Question: '',
                    QuestionType: '',
                    SubInputs: [],
                },
            ]),
        });
    }

    render() {
        return (
            <div>
                <form>
                    <div className="card padded">
                        <h1>Form Builder</h1>
                        <QuestionsList
                            onQuestionChanged={this.handleQuestionChanged}
                            questions={this.state.questions}
                        />
                    </div>
                </form>
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
                        SubInputs: [],
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
                        SubInputs: [],
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

function updateQuestions(questions, layeredIndex, fieldName, newValue) {
    if (typeof layeredIndex === 'number') {
        questions[layeredIndex][fieldName] = newValue;
    } else if (typeof layeredIndex === 'string') {
        let layers = layeredIndex.split('_');
        layers.splice(0, 1);
        let question = traverseArrayForNestedQuestion(
            layers,
            questions[layers[0]],
        );
        question[fieldName] = newValue;
    }
    return questions;
}

function traverseArrayForNestedQuestion(layers, question) {
    if (layers.length === 1) {
        return question.SubInputs[layers[0]];
    } else {
        let nestedQuestion = question.SubInputs[layers[0]];
        layers.splice(0, 1);
        return traverseArrayForNestedQuestion(layers, nestedQuestion);
    }
}

export default FormBuilder;
