import { IQuestionBase } from '../interfaces/question-base';
import { QuestionTypesEnum } from '../enums/QuestionTypes';

function getDefaultConditionValue(parentQuestion: IQuestionBase) {
    let defaltConditionValue: string | number = '';
    switch (parentQuestion.QuestionType) {
        case QuestionTypesEnum.YesNo:
            defaltConditionValue = 'Yes';
            break;
        case QuestionTypesEnum.Number:
            defaltConditionValue = 0;
            break;
        default:
            defaltConditionValue = '';
            break;
    }
    return defaltConditionValue;
}

export default getDefaultConditionValue;
