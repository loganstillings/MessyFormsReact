import { IQuestionBase } from './question-base';
import { ConditionTypesEnum } from '../enums/ConditionTypes';

export interface ISubInput extends IQuestionBase {
    ConditionType: ConditionTypesEnum;
    ConditionValue: string | number;
}
