import { IQuestionBase } from './question-base';
import { ConditionTypesEnum } from '../enums/ConditionTypes';
import { QuestionTypesEnum } from '../enums/QuestionTypes';

export interface ISubInput extends IQuestionBase {
    ConditionType: ConditionTypesEnum;
    ConditionValue: string | number;
}
