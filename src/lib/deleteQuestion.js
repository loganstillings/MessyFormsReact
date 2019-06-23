import traverseAndDelete from '../lib/traverseAndDelete';

function deleteQuestion(questions, layeredIndex) {
    if (typeof layeredIndex === 'number') {
        questions.splice(layeredIndex, 1);
    } else if (typeof layeredIndex === 'string') {
        let layers = layeredIndex.split('_');
        let questionWithSubInputs = questions[layers[0]];
        layers.splice(0, 1);
        traverseAndDelete(layers, questionWithSubInputs);
    }
    return questions;
}

export default deleteQuestion;
