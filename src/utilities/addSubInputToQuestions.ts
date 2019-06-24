import getDefaultConditionValue from './getDefaultConditionValue';
import traverseArrayForNestedQuestion from './traverseArrayForNestedQuestion';

import { ITopLevelQuestion } from '../interfaces/top-level-question';

function addSubInputToQuestions(
    questions: ITopLevelQuestion[],
    layeredIndex: string,
) {
    const layers = layeredIndex.split('_');
    if (layers.length === 1) {
        const layeredIndex = parseInt(layers[0]);
        questions[layeredIndex].SubInputs.push({
            ConditionType: 'Equals',
            ConditionValue: getDefaultConditionValue(questions[layeredIndex]),
            Question: '',
            QuestionType: 'Text',
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
            ConditionType: 'Equals',
            ConditionValue: getDefaultConditionValue(question),
            Question: '',
            QuestionType: 'Text',
            SubInputs: [],
        });
    }
    return questions;
}

export default addSubInputToQuestions;
