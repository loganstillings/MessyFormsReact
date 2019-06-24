import { IQuestionBase } from './question-base';

export interface ISubInput extends IQuestionBase {
    ConditionType: string;
    ConditionValue: string | number;
}
