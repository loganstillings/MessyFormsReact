import traverseAndDelete from './traverseAndDelete';

import { ITopLevelQuestion } from '../interfaces/top-level-question';

function deleteQuestion(questions: ITopLevelQuestion[], layeredIndex: string) {
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
