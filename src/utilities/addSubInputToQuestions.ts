import getDefaultConditionValue from './getDefaultConditionValue';
import traverseArrayForNestedQuestion from './traverseArrayForNestedQuestion';

import { ITopLevelQuestion } from '../interfaces/top-level-question';
import { ConditionTypesEnum } from '../enums/ConditionTypes';
import { QuestionTypesEnum } from '../enums/QuestionTypes';

function addSubInputToQuestions(
    questions: ITopLevelQuestion[],
    layeredIndex: string,
) {
    const layers = layeredIndex.split('_');
    if (layers.length === 1) {
        const layeredIndex = parseInt(layers[0]);
        questions[layeredIndex].SubInputs.push({
            ConditionType: ConditionTypesEnum.Equals,
            ConditionValue: getDefaultConditionValue(questions[layeredIndex]),
            Question: '',
            QuestionType: QuestionTypesEnum.Text,
            SubInputs: [],
        });
    } else {
        const questionWithSubInputs = questions[parseInt(layers[0])];
        layers.splice(0, 1);
        const question = traverseArrayForNestedQuestion(
            layers,
            questionWithSubInputs,
        );
        question.SubInputs.push({
            ConditionType: ConditionTypesEnum.Equals,
            ConditionValue: getDefaultConditionValue(question),
            Question: '',
            QuestionType: QuestionTypesEnum.Text,
            SubInputs: [],
        });
    }
    return questions;
}

export default addSubInputToQuestions;
