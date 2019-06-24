import React from 'react';
import Dexie from 'dexie';

import '../../styles/styles.css';

import db from '../../db/db';
import FormActionButtons from './form-action-buttons/form-action-buttons';
import QuestionsList from '../questions/questions-list';

import addSubInputToQuestions from '../../utilities/addSubInputToQuestions';
import deleteQuestion from '../../utilities/deleteQuestion';
import updateQuestions from '../../utilities/updateQuestions';

import { ITopLevelQuestion } from '../../interfaces/top-level-question';
import { QuestionTypesEnum } from '../../enums/QuestionTypes';

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

        this.questionsTable = db.table('questions');
    }

    private questionsTable: Dexie.Table<ITopLevelQuestion, number>;

    private getAllQuestions(): Dexie.Promise<ITopLevelQuestion[]> {
        return this.questionsTable.orderBy(':id').toArray();
    }

    componentDidMount() {
        this.getAllQuestions().then((questions: ITopLevelQuestion[]) => {
            this.setState({ questions });
        });
    }

    handleSave() {
        const currentQuestions = [...this.state.questions];
        this.getAllQuestions().then(
            (existingQuestions: ITopLevelQuestion[]) => {
                this.mergeQuestions(existingQuestions, currentQuestions);
            },
        );
    }

    private mergeQuestions(
        existingQuestions: ITopLevelQuestion[],
        currentQuestions: ITopLevelQuestion[],
    ) {
        const questionIdsToRemove = existingQuestions
            .filter(
                (topLevelQuestion) =>
                    topLevelQuestion.Id >= currentQuestions.length,
            )
            .map((question) => question.Id);
        this.questionsTable.bulkDelete(questionIdsToRemove).then(() => {
            currentQuestions.map(
                (currentQuestion, index) => (currentQuestion.Id = index),
            );
            this.questionsTable.bulkPut(currentQuestions).then(() => {
                this.setState({
                    questions: currentQuestions,
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
                    Id: questions.length,
                    Question: '',
                    QuestionType: QuestionTypesEnum.Text,
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
