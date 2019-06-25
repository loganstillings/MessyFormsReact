import React from 'react';
import Dexie from 'dexie';

import db from '../../db/db';

import '../../styles/styles.css';

import FormActionButtons from './form-action-buttons/form-action-buttons';
import QuestionsList from '../questions/questions-list';

import { ITopLevelQuestion } from '../../interfaces/top-level-question';
import { QuestionTypesEnum } from '../../enums/QuestionTypes';
import Utilities from '../../utilities/utilities';

interface IFormBuilderProps {}

interface IFormBuilderState {
    questions: ITopLevelQuestion[];
}

class FormBuilder extends React.Component<
    IFormBuilderProps,
    IFormBuilderState
> {
    constructor(props: IFormBuilderProps) {
        super(props);
        this.state = {
            questions: [],
        };
        this._questionsTable = db.table('questions');
    }

    private _questionsTable: Dexie.Table<ITopLevelQuestion, number>;

    private _getAllQuestions = (): Dexie.Promise<ITopLevelQuestion[]> => {
        return this._questionsTable.orderBy(':id').toArray(); // :id refers to primary key Id
    };

    public componentDidMount() {
        this._getAllQuestions().then((questions: ITopLevelQuestion[]) => {
            this.setState({ questions });
        });
    }

    private _handleSave = () => {
        const currentQuestions = [...this.state.questions];
        this._getAllQuestions().then(
            (existingQuestions: ITopLevelQuestion[]) => {
                this._mergeQuestions(existingQuestions, currentQuestions);
            },
        );
    };

    private _mergeQuestions = (
        existingQuestions: ITopLevelQuestion[],
        currentQuestions: ITopLevelQuestion[],
    ) => {
        const questionIdsToRemove = existingQuestions // Removing questions that are greater than the length of the current questions
            .filter(
                (topLevelQuestion) =>
                    topLevelQuestion.Id >= currentQuestions.length,
            )
            .map((question) => question.Id);
        this._questionsTable.bulkDelete(questionIdsToRemove).then(() => {
            // delete those questions
            currentQuestions.map(
                // assign Id of current questions to be the index
                (currentQuestion, index) => (currentQuestion.Id = index),
            );
            this._questionsTable.bulkPut(currentQuestions).then(() => {
                // update questions list
                this.setState({
                    questions: currentQuestions,
                });
            });
        });
    };

    private _handleQuestionChanged = (
        event:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>,
        layeredIndex: string,
    ) => {
        const fieldName = event.target.name;
        const newValue = event.target.value;
        const questionsCopy = [...this.state.questions];
        const updatedQuestions = Utilities.updateQuestions(
            questionsCopy,
            layeredIndex,
            fieldName,
            newValue,
        );
        this.setState({
            questions: updatedQuestions,
        });
    };

    private _handleInputAdded = () => {
        const questions = [...this.state.questions];
        const newQuestionArray: ITopLevelQuestion[] = [
            {
                Id: questions.length,
                Question: '',
                QuestionType: QuestionTypesEnum.Text,
                SubInputs: [],
            },
        ];
        this.setState({
            questions: questions.concat(newQuestionArray),
        });
    };

    private _handleSubInputAdded = (layeredIndex: string) => {
        const questionsCopy = [...this.state.questions];
        const updatedQuestions = Utilities.addSubInputToQuestions(
            questionsCopy,
            layeredIndex,
        );
        this.setState({
            questions: updatedQuestions,
        });
    };

    private _handleDelete = (layeredIndex: string) => {
        const questionsCopy = [...this.state.questions];
        const updatedQuestions = Utilities.deleteQuestion(
            questionsCopy,
            layeredIndex,
        );
        this.setState({
            questions: updatedQuestions,
        });
    };

    public render() {
        return (
            <div>
                <form>
                    <div className="card padded">
                        <h1>Form Builder</h1>
                        <QuestionsList
                            onQuestionChanged={this._handleQuestionChanged}
                            questions={this.state.questions}
                            onSubInputAdded={this._handleSubInputAdded}
                            onDelete={this._handleDelete}
                        />
                    </div>
                </form>
                <FormActionButtons
                    onInputAdded={this._handleInputAdded}
                    onSave={this._handleSave}
                />
            </div>
        );
    }
}

export default FormBuilder;
