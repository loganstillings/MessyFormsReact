import React from 'react';

import '../../styles/styles.css';

import db from '../../db/db';
import FormActionButtons from './form-action-buttons/form-action-buttons';
import QuestionsList from '../questions/questions-list';

import addSubInputToQuestions from '../../utilities/addSubInputToQuestions';
import deleteQuestion from '../../utilities/deleteQuestion';
import updateQuestions from '../../utilities/updateQuestions';

import { ITopLevelQuestion } from '../../interfaces/top-level-question';

interface FormBuilderProps {}

interface FormBuilderState {
    questions: ITopLevelQuestion[];
}

class FormBuilder extends React.Component<FormBuilderProps, FormBuilderState> {
    constructor(props: FormBuilderProps) {
        super(props);
        this.state = {
            questions: [],
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleQuestionChanged = this.handleQuestionChanged.bind(this);
        this.handleInputAdded = this.handleInputAdded.bind(this);
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
                            .catch((err) => {
                                console.log(err);
                            });
                        this.setState({
                            questions: arr,
                        });
                    });
            });
    }

    handleQuestionChanged(
        event:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>,
        layeredIndex: string,
    ) {
        const fieldName = event.target.name;
        const newValue = event.target.value;
        const questionsCopy = [...this.state.questions];
        const updatedQuestions = updateQuestions(
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
        const questions = [...this.state.questions];
        this.setState({
            questions: questions.concat([
                {
                    Id: questions.length + 1,
                    Question: '',
                    QuestionType: 'Text',
                    SubInputs: [],
                },
            ]),
        });
    }

    handleSubInputAdded(layeredIndex: string) {
        const questionsCopy = [...this.state.questions];
        const updatedQuestions = addSubInputToQuestions(
            questionsCopy,
            layeredIndex,
        );
        this.setState({
            questions: updatedQuestions,
        });
    }

    handleDelete(layeredIndex: string) {
        const questionsCopy = [...this.state.questions];
        const updatedQuestions = deleteQuestion(questionsCopy, layeredIndex);
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
                    onInputAdded={this.handleInputAdded}
                    onSave={this.handleSave}
                />
            </div>
        );
    }
}

export default FormBuilder;
