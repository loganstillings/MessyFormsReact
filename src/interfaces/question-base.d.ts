import { ISubInput } from './sub-input';
import { QuestionTypesEnum } from '../enums/QuestionTypes';
import { ConditionTypesEnum } from '../enums/ConditionTypes';

export interface IQuestionBase {
    Question: string;
    QuestionType: QuestionTypesEnum;
    SubInputs: ISubInput[];
    [key: string]:
        | string
        | QuestionTypesEnum
        | ISubInput[]
        | ConditionTypesEnum
        | number;
}
