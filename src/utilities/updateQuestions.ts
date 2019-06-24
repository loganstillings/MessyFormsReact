import traverseArrayForNestedQuestion from './traverseArrayForNestedQuestion';
import { IQuestion } from '../interfaces/question';

function updateQuestions(
    questions: IQuestion[],
    layeredIndex: string,
    fieldName: string,
    newValue: string | number,
) {
    const layers = layeredIndex.split('_');
    if (layers.length === 1) {
        let question = questions[parseInt(layers[0])] as any;
        question[fieldName] = newValue;
    } else {
        const questionWithSubInputs = questions[parseInt(layers[0])];
        layers.splice(0, 1);
        const question = traverseArrayForNestedQuestion(
            layers,
            questionWithSubInputs,
        ) as any;
        question[fieldName] = newValue;
    }
    return questions;
}

export default updateQuestions;
