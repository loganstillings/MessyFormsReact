import traverseAndDelete from './traverseAndDelete';
import { IQuestion } from '../interfaces/question';

function deleteQuestion(questions: IQuestion[], layeredIndex: string) {
    const layers = layeredIndex.split('_');
    if (layers.length === 1) {
        questions.splice(parseInt(layers[0]), 1);
    } else {
        const questionWithSubInputs = questions[parseInt(layers[0])];
        layers.splice(0, 1);
        traverseAndDelete(layers, questionWithSubInputs);
    }
    return questions;
}

export default deleteQuestion;
