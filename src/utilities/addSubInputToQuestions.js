import getDefaultConditionValue from './getDefaultConditionValue';
import traverseArrayForNestedQuestion from './traverseArrayForNestedQuestion';

function addSubInputToQuestions(questions, layeredIndex) {
    if (typeof layeredIndex === 'number') {
        questions[layeredIndex].SubInputs.push({
            ConditionType: 'Equals',
            ConditionValue: getDefaultConditionValue(questions[layeredIndex]),
            Question: '',
            QuestionType: 'Text',
            SubInputs: [],
        });
    } else if (typeof layeredIndex === 'string') {
        const layers = layeredIndex.split('_');
        const questionWithSubInputs = questions[layers[0]];
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
