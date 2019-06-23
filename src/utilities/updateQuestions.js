import traverseArrayForNestedQuestion from './traverseArrayForNestedQuestion';

function updateQuestions(questions, layeredIndex, fieldName, newValue) {
    if (typeof layeredIndex === 'number') {
        questions[layeredIndex][fieldName] = newValue;
    } else if (typeof layeredIndex === 'string') {
        const layers = layeredIndex.split('_');
        const questionWithSubInputs = questions[layers[0]];
        layers.splice(0, 1);
        const question = traverseArrayForNestedQuestion(
            layers,
            questionWithSubInputs,
        );
        question[fieldName] = newValue;
    }
    return questions;
}

export default updateQuestions;
