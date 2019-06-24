import { IQuestionBase } from '../interfaces/question-base';
import { ISubInput } from '../interfaces/sub-input';

function traverseArrayForNestedQuestion(
    layers: string[],
    question: IQuestionBase,
): ISubInput {
    if (layers.length === 1) {
        return question.SubInputs[parseInt(layers[0])];
    } else {
        const nestedQuestion = question.SubInputs[parseInt(layers[0])];
        layers.splice(0, 1);
        return traverseArrayForNestedQuestion(layers, nestedQuestion);
    }
}

export default traverseArrayForNestedQuestion;
