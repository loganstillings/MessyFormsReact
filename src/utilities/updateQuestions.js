import traverseArrayForNestedQuestion from './traverseArrayForNestedQuestion';

function updateQuestions(questions, layeredIndex, fieldName, newValue) {
    if (typeof layeredIndex === 'number') {
        questions[layeredIndex][fieldName] = newValue;
    } else if (typeof layeredIndex === 'string') {
        let layers = layeredIndex.split('_');
        let questionWithSubInputs = questions[layers[0]];
        layers.splice(0, 1);
        let question = traverseArrayForNestedQuestion(
            layers,
            questionWithSubInputs,
        );
        question[fieldName] = newValue;
    }
    return questions;
}

export default updateQuestions;
