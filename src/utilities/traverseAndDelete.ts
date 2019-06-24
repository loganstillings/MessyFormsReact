import { IQuestion } from '../interfaces/question';

function traverseAndDelete(layers: string[], question: IQuestion) {
    if (layers.length === 1) {
        question.SubInputs.splice(parseInt(layers[0]), 1);
    } else {
        const nestedQuestion = question.SubInputs[parseInt(layers[0])];
        layers.splice(0, 1);
        traverseAndDelete(layers, nestedQuestion);
    }
}

export default traverseAndDelete;
