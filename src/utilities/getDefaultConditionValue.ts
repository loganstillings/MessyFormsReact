import { IQuestion } from '../interfaces/question';

function getDefaultConditionValue(parentQuestion: IQuestion) {
    let defaltConditionValue: string | number = '';
    switch (parentQuestion.QuestionType) {
        case 'YesNo':
            defaltConditionValue = 'Yes';
            break;
        case 'Number':
            defaltConditionValue = 0;
            break;
        default:
            defaltConditionValue = '';
            break;
    }
    return defaltConditionValue;
}

export default getDefaultConditionValue;
