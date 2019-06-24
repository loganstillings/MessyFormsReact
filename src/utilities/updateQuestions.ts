import traverseArrayForNestedQuestion from './traverseArrayForNestedQuestion';

import { ITopLevelQuestion } from '../interfaces/top-level-question';
import { ISubInput } from '../interfaces/sub-input';

function updateQuestions(
    questions: ITopLevelQuestion[],
    layeredIndex: string,
    fieldName: string,
    newValue: string | number,
) {
    const layers = layeredIndex.split('_');
    if (layers.length === 1) {
        let topLevelQuestion: ITopLevelQuestion =
            questions[parseInt(layers[0])];
        topLevelQuestion[fieldName] = newValue as string;
    } else {
        const questionWithSubInputs = questions[parseInt(layers[0])];
        layers.splice(0, 1);
        const subInput: ISubInput = traverseArrayForNestedQuestion(
            layers,
            questionWithSubInputs,
        );
        subInput[fieldName] = newValue;
    }
    return questions;
}

export default updateQuestions;
