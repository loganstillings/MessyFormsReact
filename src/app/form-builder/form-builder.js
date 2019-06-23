import React from 'react';

import db from '../../db/db';
import './form-builder.css';
import FormActionButtons from './form-action-buttons/form-action-buttons';
import QuestionsList from './questions-list/questions-list';

class FormBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleQuestionChanged = this.handleQuestionChanged.bind(this);
        this.handleSubInputAdded = this.handleSubInputAdded.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        db.table('questions')
            .toArray()
            .then((questions) => {
                this.setState({ questions });
            });
    }

    handleSave() {
        const arr = [...this.state.questions];
        db.table('questions')
            .orderBy(':id')
            .toArray()
            .then((existingQuestions) => {
                const questionsToRemove = existingQuestions.filter((eq) => {
                    return arr.findIndex((q) => q.Id === eq.Id) === -1;
                });
                db.table('questions')
                    .bulkDelete(
                        questionsToRemove.map((question) => question.Id),
                    )
                    .then(() => {
                        arr.map((question, index) => {
                            question.Id = index;
                            return question;
                        });
                        db.table('questions')
                            .bulkPut(arr)
                            .catch(this.catchError);
                        this.setState({
                            questions: arr,
                        });
                    });
            });
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
        let questions = [...this.state.questions];
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

    handleSubInputAdded(layeredIndex) {
        const questionsCopy = [...this.state.questions];
        let updatedQuestions = addSubInputToQuestions(
            questionsCopy,
            layeredIndex,
        );
        this.setState({
            questions: updatedQuestions,
        });
    }

    handleDelete(layeredIndex) {
        const questionsCopy = [...this.state.questions];
        let updatedQuestions = deleteQuestion(questionsCopy, layeredIndex);
        this.setState({
            questions: updatedQuestions,
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
                            onSubInputAdded={this.handleSubInputAdded}
                            onDelete={this.handleDelete}
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

function updateQuestions(questions, layeredIndex, fieldName, newValue) {
    if (typeof layeredIndex === 'number') {
        questions[layeredIndex][fieldName] = newValue;
    } else if (typeof layeredIndex === 'string') {
        let layers = layeredIndex.split('_');
        let questionWithSubInputs = questions[layers[0]];
        layers.splice(0, 1);
        let question = traverseArrayForNestedQuestion(
            layers,
            questionWithSubInputs,
        );
        question[fieldName] = newValue;
    }
    return questions;
}

function addSubInputToQuestions(questions, layeredIndex) {
    if (typeof layeredIndex === 'number') {
        questions[layeredIndex].SubInputs.push({
            ConditionType: '',
            ConditionValue: '',
            Question: '',
            QuestionType: '',
            SubInputs: [],
        });
    } else if (typeof layeredIndex === 'string') {
        let layers = layeredIndex.split('_');
        let questionWithSubInputs = questions[layers[0]];
        layers.splice(0, 1);
        let question = traverseArrayForNestedQuestion(
            layers,
            questionWithSubInputs,
        );
        question.SubInputs.push({
            ConditionType: '',
            ConditionValue: '',
            Question: '',
            QuestionType: '',
            SubInputs: [],
        });
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

function deleteQuestion(questions, layeredIndex) {
    if (typeof layeredIndex === 'number') {
        questions.splice(layeredIndex, 1);
    } else if (typeof layeredIndex === 'string') {
        let layers = layeredIndex.split('_');
        let questionWithSubInputs = questions[layers[0]];
        layers.splice(0, 1);
        traverseAndDelete(layers, questionWithSubInputs);
    }
    return questions;
}

function traverseAndDelete(layers, question) {
    if (layers.length === 1) {
        question.SubInputs.splice(layers[0], 1);
    } else {
        let nestedQuestion = question.SubInputs[layers[0]];
        layers.splice(0, 1);
        traverseAndDelete(layers, nestedQuestion);
    }
}

export default FormBuilder;
