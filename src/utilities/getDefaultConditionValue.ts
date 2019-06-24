import { IQuestionBase } from '../interfaces/question-base';

function getDefaultConditionValue(parentQuestion: IQuestionBase) {
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
