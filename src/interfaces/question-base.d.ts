import { ISubInput } from './sub-input';
import { QuestionTypesEnum } from '../enums/QuestionTypes';

export interface IQuestionBase {
    Question: string;
    QuestionType: QuestionTypesEnum;
    SubInputs: ISubInput[];
}
