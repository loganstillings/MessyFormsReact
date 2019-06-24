import { IQuestion } from './question';

export interface ISubInput extends IQuestion {
    ConditionType: string;
    ConditionValue: string | number;
}
