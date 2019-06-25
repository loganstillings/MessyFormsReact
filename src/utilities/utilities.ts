import { ITopLevelQuestion } from '../interfaces/top-level-question';
import { ISubInput } from '../interfaces/sub-input';
import { IQuestionBase } from '../interfaces/question-base';
import { QuestionTypesEnum } from '../enums/QuestionTypes';
import { ConditionTypesEnum } from '../enums/ConditionTypes';

class Utilities {
    // could be a more specific name if the app was larger
    public updateQuestions(
        questions: ITopLevelQuestion[],
        layeredIndex: string,
        //  layeredIndex describes the question that is being updated in the
        //  format "topLayerIndex_nextLayerIndex_nextLayerIndex_..."
        fieldName: string,
        newValue: string | number,
    ) {
        const layers = layeredIndex.split('_');
        if (layers.length === 1) {
            const topLevelQuestion: ITopLevelQuestion =
                questions[parseInt(layers[0])];
            topLevelQuestion[fieldName] = newValue;
        } else {
            const questionWithSubInputs = questions[parseInt(layers[0])];
            layers.splice(0, 1);
            const subInput: ISubInput = this.traverseArrayForNestedQuestion(
                layers,
                questionWithSubInputs,
            );
            subInput[fieldName] = newValue;
        }
        return questions;
    }

    public traverseArrayForNestedQuestion(
        layers: string[],
        question: IQuestionBase,
    ): ISubInput {
        if (layers.length === 1) {
            return question.SubInputs[parseInt(layers[0])];
        } else {
            const nestedQuestion = question.SubInputs[parseInt(layers[0])];
            layers.splice(0, 1);
            return this.traverseArrayForNestedQuestion(layers, nestedQuestion);
        }
    }

    public traverseAndDelete(layers: string[], question: IQuestionBase) {
        if (layers.length === 1) {
            question.SubInputs.splice(parseInt(layers[0]), 1);
        } else {
            const nestedQuestion = question.SubInputs[parseInt(layers[0])];
            layers.splice(0, 1);
            this.traverseAndDelete(layers, nestedQuestion);
        }
    }

    public getDefaultConditionValue(parentQuestion: IQuestionBase) {
        let defaltConditionValue: string | number = '';
        switch (parentQuestion.QuestionType) {
            case QuestionTypesEnum.YesNo:
                defaltConditionValue = 'Yes';
                break;
            case QuestionTypesEnum.Number:
                defaltConditionValue = 0;
                break;
            default:
                defaltConditionValue = '';
                break;
        }
        return defaltConditionValue;
    }

    public deleteQuestion(
        questions: ITopLevelQuestion[],
        layeredIndex: string,
    ) {
        const layers = layeredIndex.split('_');
        if (layers.length === 1) {
            questions.splice(parseInt(layers[0]), 1);
        } else {
            const questionWithSubInputs = questions[parseInt(layers[0])];
            layers.splice(0, 1);
            this.traverseAndDelete(layers, questionWithSubInputs);
        }
        return questions;
    }

    public addSubInputToQuestions(
        questions: ITopLevelQuestion[],
        layeredIndex: string,
    ) {
        const layers = layeredIndex.split('_');
        if (layers.length === 1) {
            const layeredIndex = parseInt(layers[0]);
            questions[layeredIndex].SubInputs.push({
                ConditionType: ConditionTypesEnum.Equals,
                ConditionValue: this.getDefaultConditionValue(
                    questions[layeredIndex],
                ),
                Question: '',
                QuestionType: QuestionTypesEnum.Text,
                SubInputs: [],
            });
        } else {
            const questionWithSubInputs = questions[parseInt(layers[0])];
            layers.splice(0, 1);
            const question = this.traverseArrayForNestedQuestion(
                layers,
                questionWithSubInputs,
            );
            question.SubInputs.push({
                ConditionType: ConditionTypesEnum.Equals,
                ConditionValue: this.getDefaultConditionValue(question),
                Question: '',
                QuestionType: QuestionTypesEnum.Text,
                SubInputs: [],
            });
        }
        return questions;
    }
}

export default new Utilities();
